
import dgram from 'dgram'

import { UDP_LOCAL_PORT } from '../config/index.js'

import emitter from '../util/emitter.js'

let udpRemoteIP = ''
let udpRemotePort = ''
let udpRemoteOnline = false
let serialPort = ''
let serialStatus = ''

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
    // if (strMsg === 'Test remote UDP server is ready') {
    //   udpRemoteIP = address
    //   udpRemotePort = port
    //   udpRemoteOnline = true
    //   console.log('---- client online')
    //   sendMsg('category=remoteUDPServerIsReady&')
    //   return
    // }

    // if (strMsg === 'close client') {
    //   udpRemoteIP = ''
    //   udpRemotePort = 0
    //   udpRemoteOnline = false

    //   console.log('---- client offline')
    //   return
    // }

    const mapMsg = coverMsg(strMsg)
    console.log(mapMsg)

    if (mapMsg.c !== 'a') return
  
    udpRemoteIP = address
    udpRemotePort = port
    udpRemoteOnline = true

    switch (mapMsg.m) {
      case 'openclient':

        emitter.emit(mapMsg.t, JSON.stringify(Object.assign({
          udpRemoteIP,
          udpRemotePort,
          udpRemoteOnline
        }, mapMsg)))

        sendMsg(`c=b&t=n&m=clientback&ip=${udpRemoteIP}&port=${udpRemotePort}`)

        break
      
      case 'closeclient':

        udpRemoteIP = ''
        udpRemotePort = ''
        udpRemoteOnline = false

        emitter.emit(mapMsg.t, JSON.stringify(Object.assign({
          udpRemoteIP,
          udpRemotePort,
          udpRemoteOnline
        }, mapMsg)))

        break
      
      case 'openport':
      case 'closeport':
        serialPort = mapMsg.portnum
        serialStatus = mapMsg.status
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

  server.on('listening', () => {
    const address = server.address()
    console.log(`UDP server listening ${address.address}:${address.port}`)
  })

  server.bind(UDP_LOCAL_PORT)

  return sendMsg
}

const sendUDPMsg = initUDPSev()

const getInfo = () => {
  return {
    udpRemoteIP,
    udpRemotePort,
    udpRemoteOnline,
    serialPort,
    serialStatus
  }
}

export { sendUDPMsg, getInfo }