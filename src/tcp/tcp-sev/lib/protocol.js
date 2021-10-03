
import d from 'debug'
import assert from 'assert'
import { EventEmitter } from 'events'
import ByteBuffer from 'byte'

import Parser from './parser.js'

import {
  FIELDS,
  MAX_PACKET_ID
} from './constants.js'

import {
  isNumber,
  isObject
} from './util.js'

const debug = d('net:protocol')

export default class Protocol extends EventEmitter {
  constructor(options = {}) {
    super()
    this._opaque = 0
    this._size = 0
    this._packet = null
    this._parsed = false
    this._fields = FIELDS

    this._encoding = options.encoding || 'utf8'

    this._parser = new Parser({ fields: this._fields })
    this._parser.on('packet', packet => {
      this.parsed = true
      this.packet = packet
    })
  }

  get size() {
    if (!this._size) {
      for (const field of this._fields) {
        this._size += field.size
      }
    }
    return this._size
  }
  
  get parsed() {
    return this._parsed
  }

  set parsed(val) {
    this._parsed = val
  }

  get packet() {
    return this._packet
  }

  set packet(val) {
    this._packet = val
  }

  _generateReqId() {
    if (this._opaque === MAX_PACKET_ID) {
      this._opaque = 1
    } else {
      ++this._opaque
    }
    return this._opaque
  }

  pack(buf, info = {}) {
    const { reqType = 0, packetType = 0 } = info
    let { reqId } = info

    if (reqType === 0) {
      // 如果是普通请求，则为他生成reqId
      reqId = this._generateReqId()
    } else if (reqType === 1) {
      // 如果是响应请求，则reqId不能为空
      assert(isNumber(reqId), 'reqId should be number when reqType = 1!')
    } else {
      throw new Error('invalid reqType, should be either 0 or 1!')
    }

    info.reqId = reqId
    info.packetType = packetType

    debug('send packet(#%s)', reqId)

    const headerBuf = new ByteBuffer({ size: this.size })
    for (const field of this._fields) {
      headerBuf[`put${field.type}`].apply(headerBuf, [ info[field.name] ])
    }
    return {
      id: reqId,
      packet: Buffer.concat([ headerBuf.copy(), buf ])
    }
  }

  _encode(data) {
    if (data == null) {
      return Buffer.alloc(0)
    }

    if (Buffer.isBuffer(data)) {
      return data
    }

    const encoding = this._encoding
    if (isObject(data)) {
      data = JSON.stringify(data)
    } else {
      data = String(data)
    }
    return Buffer.from(data, encoding)
  }
  encode(data) {
    // const transCoder = this._transCoder
    // if (transCoder && transCoder.encode) {
    //   data = transCoder.encode(data)
    //   assert(is.buffer(data), 'transCoder.encode() should return Buffer!')
    //   return data
    // }
    return this._encode(data)
  }

  _decode(data) {
    return data.toString(this._encoding)
  }
  decode(data) {
    // const transCoder = this._transCoder;
    // if (transCoder && transCoder.decode) {
    //   return transCoder.decode(data);
    // }
    return this._decode(data)
  }

  parse(chunk) {
    // 已经解析过了
    if (this.parsed) {
      return chunk
    }

    chunk = this._parser.parse(chunk)
    if (chunk) {
      const { reqId } = this.packet
      debug('receive packet(#%s)', reqId)
      return chunk
    }
    return null
  }

  read() {
    throw new Error('should be implemented!')
  }

  write() {
    throw new Error('should be implemented!')
  }
}