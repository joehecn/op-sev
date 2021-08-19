
import dgram from 'dgram'

import {
  UDP_LOCAL_PORT
} from '../config/index.js'

let udpRemoteIP = ''
let udpRemotePort = 0
let udpRemoteOnline = false

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
    if (!udpRemoteOnline) return
    server.send(msg, udpRemotePort, udpRemoteIP, (err, bytes) => {
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
    const strMsg = msg.toString()
    console.log({ strMsg })
    if (strMsg === 'Test remote UDP server is ready') {
      udpRemoteIP = address
      udpRemotePort = port
      udpRemoteOnline = true
      console.log('---- client online')
      sendMsg('remote UDP server is ready')
      return
    }

    if (strMsg === 'close client') {
      udpRemoteIP = ''
      udpRemotePort = 0
      udpRemoteOnline = false

      console.log('---- client offline')
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

export { sendUDPMsg }