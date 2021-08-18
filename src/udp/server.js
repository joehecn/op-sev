import dgram from 'dgram'

import {
  UDP_LOCAL_PORT,
  UDP_REMOTE_IP,
  UDP_REMOTE_PORT
} from '../config/index.js'

const initUDPSev = () => {
  const server = dgram.createSocket('udp4')

  const sendMsg = msg => {
    server.send(msg, UDP_REMOTE_PORT, UDP_REMOTE_IP, (err, bytes) => {
      console.log({ err, bytes })
    })
  }

  server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`)
    server.close()
  })

  server.on('message', (msg, rinfo) => {
    const { address, port } = rinfo
    console.log({ address, port })
    console.log(msg.toString())
    // 限定只能和定义好的客户端通信
    if (address !== UDP_REMOTE_IP || port !== UDP_REMOTE_PORT) return
    
  })

  server.on('listening', () => {
    const address = server.address()
    console.log(`UDP server listening ${address.address}:${address.port}`)
  })

  server.bind(UDP_LOCAL_PORT)

  return sendMsg
}

const sendUDPMsg = initUDPSev()

export default sendUDPMsg