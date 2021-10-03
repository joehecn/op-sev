
import net from 'net'
import { Connection } from './tcp-sev/index.js'
import { TCP_LOCAL_PORT as port } from '../config/index.js'
import { CONNECT } from './tcp-sev/lib/constants.js'

const connMap = new Map()

export const initTCPServer = () => {
  net.createServer(socket => {
    const conn = new Connection({ socket })
  
    // // 发送一个packet
    // conn.write('hello world')
  
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
  
      connMap.set(`${remoteAddress}:${remotePort}`, conn)
    })
  
    // 收到packet
    conn.on('packet', ({ reqId, body }) => {
      console.log({ reqId, body })
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

// export const list = () => [...connMap].map(([, value]) => value)
export const getMap = () => connMap
export const sendMsg = (key, message) => {
  const conn = connMap.get(key)
  if (conn && conn.connected === CONNECT) conn.write(message)
}
