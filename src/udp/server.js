import dgram from 'dgram'

import {
  UDP_LOCAL_PORT,
  UDP_REMOTE_IP,
  UDP_REMOTE_PORT
} from '../config/index.js'

const coverMsg = strMsg => {
  const map = {}
  const arr = strMsg.split('&')
  arr.forEach(element => {
    const [key, value] = element.split('=')
    map[key] = value
  })
  return map
}

const initUDPSev = () => {
  const server = dgram.createSocket('udp4')

  const sendMsg = msg => {
    server.send(msg, UDP_REMOTE_PORT, UDP_REMOTE_IP, (err, bytes) => {
      console.log({ UDP_REMOTE_IP, UDP_REMOTE_PORT, err, bytes })
    })
  }

  server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`)
    server.close()
  })

  server.on('message', (msg, rinfo) => {
    const { address, port } = rinfo
    console.log({ address, port })
    const strMsg = msg.toString()
    console.log({ strMsg })
    if (strMsg === 'Test remote UDP server is ready') {
      sendMsg('remote UDP server is ready')
      return
    }

    const mapMsg = coverMsg(strMsg)
    console.log(mapMsg)
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