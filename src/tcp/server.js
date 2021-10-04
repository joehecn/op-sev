
import net from 'net'
import { Connection } from './tcp-sev/index.js'
import { TCP_LOCAL_PORT as port } from '../config/index.js'
import { CONNECT } from './tcp-sev/lib/constants.js'

import emitter from '../util/emitter.js'

const connMap = new Map()

const coverMsg = strMsg => {
  const map = {}
  const arr = strMsg.split('&')
  arr.forEach(element => {
    const [key, value] = element.split('=')
    map[key] = value
  })
  return map
}

export const initTCPServer = () => {
  net.createServer(socket => {
    const conn = new Connection({ socket })
  
    conn.on('connect', () => {
      console.log('---- conn connect:')
      
      const {
        localAddress,
        localPort,
        remoteAddress,
        remotePort
      } = conn
      console.log({
        localAddress,
        localPort,
        remoteAddress,
        remotePort
      })
      
      const _id = `${remoteAddress}:${remotePort}`
      connMap.set(_id, conn)
    })
  
    // 收到packet
    conn.on('packet', ({ reqId, body }) => {
      const mapMsg = coverMsg(body)
      console.log({ reqId, body, mapMsg })

      if (mapMsg.c !== 'a') return

      switch (mapMsg.m) {
        case 'openport':
        case 'closeport':
          conn.serialPort = mapMsg.portnum
          conn.serialStatus = mapMsg.status

          mapMsg._id = `${conn.remoteAddress}:${conn.remotePort}`
          emitter.emit(mapMsg.t, JSON.stringify(mapMsg))
          break
        case 'versionback':
        case 'cardback':
          emitter.emit(mapMsg.t, JSON.stringify(mapMsg))
          break
        default:
          break
      }
    })
  
    conn.on('close', () => {
      console.log('---- conn close:')
    
      const {
        localAddress,
        localPort,
        remoteAddress,
        remotePort
      } = conn
      console.log({
        localAddress,
        localPort,
        remoteAddress,
        remotePort
      })
  
      connMap.delete(`${remoteAddress}:${remotePort}`, conn)
    })
  
    conn.on('error', err => {
      console.log('---- conn error:')
      console.error(err)
  
      const {
        localAddress,
        localPort,
        remoteAddress,
        remotePort
      } = conn
      console.log({
        localAddress,
        localPort,
        remoteAddress,
        remotePort
      })
    })
  }).listen({ port }, () => console.log(`---- tcp server listening at ${port}`))
}

export const list = () => [...connMap].map(([, value]) => value)
export const getConn = key => connMap.get(key)
export const sendMsg = (conn, message) => {
  console.log({ message })
  if (conn && conn.connected === CONNECT) conn.write(message)
}
