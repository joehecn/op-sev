
import net from 'net'
import assert from 'assert'
import { EventEmitter } from 'events'

import d from 'debug'

import {
  // _state, connected
  DISCONNECT,
  DISCONNECTING,
  CONNECT,
  CONNECTING,

  IDLE_TIMEOUT,
  FINWAIT_TIMEOUT,

  HEARTBEAT_INTERVAL,
  HEARTBEAT_TIMEOUT,
  HEARTBEAT_TIMEOUT_LIMIT
} from './constants.js'

import LengthBasedProtocol from './protocols/length_based_protocol.js'

const debug = d('net:connection')

const DEFAULT_OPTIONS = {
  idleTimeout: IDLE_TIMEOUT,
  finWaitTimeout: FINWAIT_TIMEOUT
}

export default class Connection extends EventEmitter {
  // server: socket
  // client: host, port
  constructor(options = {}) {
    super()

    options = Object.assign({}, DEFAULT_OPTIONS, options)

    this._options = options

    this._isServer = false
    this._state = DISCONNECT

    this._socket = options.socket
    this._protocol = options.protocol || new LengthBasedProtocol()
    this._idleTimeout = options.idleTimeout
    this._finWaitTimeout = options.finWaitTimeout

    this._heartbeatTimer = null
    this._heartbeatInterval = options.heartbeatInterval || HEARTBEAT_INTERVAL
    this._heartbeatTimeout = options.heartbeatTimeout || HEARTBEAT_TIMEOUT
    this._heartbeatTimeoutLimit = options.heartbeatTimeoutLimit || HEARTBEAT_TIMEOUT_LIMIT


    this._heartbeatTimeoutCount = 0
    this._pendingTimers = []

    this._serialPort = null
    this._serialStatus = 'close'

    this._connect()
  }

  get connected() {
    return this._state
  }

  get localAddress() {
    if (this._socket) {
      const __localAddress = this._socket.localAddress
      if (__localAddress) {
        return __localAddress
      }
    }
    return this._options.host
  }

  get localPort() {
    if (this._socket) {
      const __localPort = this._socket.localPort
      if (__localPort) {
        return __localPort
      }
    }
    return this._options.port
  }

  get remoteAddress() {
    if (this._socket) {
      const __remoteAddress = this._socket.remoteAddress
      if (__remoteAddress) {
        return __remoteAddress.replace('::ffff:', '')
      }
    }
    return ''
  }

  get remotePort() {
    if (this._socket) {
      const __remotePort = this._socket.remotePort
      if (__remotePort) {
        return __remotePort
      }
    }
    return null
  }

  get serialPort() {
    return this._serialPort
  }
  set serialPort(val) {
    this._serialPort = val
  }

  get serialStatus() {
    return this._serialStatus
  }
  set serialStatus(val) {
    this._serialStatus = val
  }

  _connect() {
    if (this._socket) {
      // server
      this._isServer = true
      process.nextTick(() => this._socket.emit('connect'))
    } else {
      // client
      assert(this._options.host, '[Connection]: options.host required!')
      assert(this._options.port, '[Connection]: options.port required!')
    }

    const { host, port } = this._options
    this._state = CONNECTING
    this._socket = this._socket || net.createConnection({ host, port })

    this._socket.on('connect', this._onConnect.bind(this))
    this._socket.on('data', data => this.read(data))
    this._protocol.on('data', data => {
      try {
        this._socket.write(data)
      } catch (error) {
        console.error(error)
      }
    })
    this._protocol.on('packet', this._onPacket.bind(this))
    this._protocol.on('error', this._onError.bind(this))
    this._socket.on('error', this._onError.bind(this))
    this._socket.on('close', this._onClose.bind(this))
    this._socket.on('timeout', this._onTimeout.bind(this))

    this._socket.setTimeout(this._idleTimeout)
  }

  _setupHeartbeatTimer() {
    const interval = this._heartbeatInterval
    const timeout = this._heartbeatTimeout
    const limit = this._heartbeatTimeoutLimit

    // 心跳超时，关闭连接
    this.on('heartbeatTimeout', () => this.end())

    // 启动心跳定时器
    this._heartbeatTimer = setInterval(() => {
      let ack = false

      // 发送心跳请求
      const reqId = this.write(null, { reqType: 0, packetType: 1 })
      const onAck = createOnAck(this, reqId)
      this.on('heartbeatPacket', onAck)
      const timer = setTimeout(() => {
        this.removeListener('heartbeatPacket', onAck)
        clearTimeout(timer)

        if (!ack) {
          // 心跳超时次数超过上限，触发heartbeatTimeout事件
          if (++this._heartbeatTimeoutCount >= limit) {
            this.emit('heartbeatTimeout')
          }
        }
      }, timeout)

      function createOnAck(conn, id) {
        return function onAck({ reqType, reqId, packetType }) {
          if (reqType === 1 && packetType === 1 && reqId === id) {
            ack = true
            conn.removeListener('heartbeatPacket', onAck)
          }
        };
      }
    }, interval)
  }

  _onConnect() {
    debug('connected: %j', this._options)

    // // for test：为了模拟connect timeout超时的情况
    // if (this._options.connectCallback) {
    //   await this._options.connectCallback();
    // }

    // 重置一下，如果之前传入connectTimeout，则重置掉。
    // 重复调用socket.setTimeout没有问题，node内部会移除先前的listener: https://github.com/nodejs/node/blob/master/lib/net.js#L411-L413
    this._socket.setTimeout(this._idleTimeout)
    this._state = CONNECT
    this.emit('connect')

    // 服务端启动心跳检测
    if (this._isServer) {
      this._setupHeartbeatTimer()
    }
  }

  _onPacket(packet) {
    debug('receive packet: %j', packet)

    const { reqType, reqId, packetType } = packet
    if (packetType === 1) {
      if (reqType === 0) {
        // 心跳请求，一般是服务端发起
        this.write(null, { reqType: 1, reqId, packetType })
      } else if (reqType === 1) {
        // 心跳响应，把timeout次数减1，一般是客户端发起
        if (this._heartbeatTimeoutCount > 0) {
          --this._heartbeatTimeoutCount
        }
      }
      this.emit('heartbeatPacket', packet)
      return
    }

    this.emit('packet', packet)
  }

  _onError(e) {
    console.error(e)
    this.emit('error', e)
    this.end()
  }

  _onClose() {
    debug('closed: %j', this._options)

    // 连接已经关闭
    this._state = DISCONNECT
    this.emit('close')
    this.removeAllListeners()

    if (this._heartbeatTimer) {
      clearInterval(this._heartbeatTimer)
    }

    // remove pending timers
    for (const timer of this._pendingTimers) {
      clearTimeout(timer)
    }
  }

  _onTimeout() {
    debug('connection timeout!')

    const err = new Error(`timeout when connecting ${this.remoteAddress}`)
    err.name = 'ConnectionTimeOut'

    // 如果超时了，关闭连接
    this._onError(err)
  }

  read(data) {
    try {
      this._protocol.read(data)
    } catch (e) {
      e.name = 'ConnectionReadError'
      this.emit('error', e)
    }
  }

  write(data, info) {
    try {
      return this._protocol.write(data, info)
    } catch (e) {
      e.name = 'ConnectionWriteError'
      this.emit('error', e)
    }
  }

  end() {
    if (this._socket && this._socket.writable) {
      this._state = DISCONNECTING
      this._socket.end()

      // ensure socket close after shutdown
      // https://github.com/nodejs/node/issues/11572
      const socket = this._socket
      const timer = setTimeout(() => {
        if (socket && !socket.destroyed) {
          this.emit('finWaitTimeout')
          socket.destroy()
          this._onClose()
        }
      }, this._finWaitTimeout)
      this._pendingTimers.push(timer)
    }
    return this
  }

  toJSON() {
    return {
      connected: this.connected,
      localAddress: this.localAddress,
      localPort: this.localPort,
      remoteAddress: this.remoteAddress,
      remotePort: this.remotePort,
      serialPort: this.serialPort,
      serialStatus: this.serialStatus
    }
  }
}
