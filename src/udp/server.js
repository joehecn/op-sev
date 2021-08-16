import dgram from 'dgram'

import { UDP_LOCAL_PORT } from '../config/index.js'

const initUDPSev = () => {
  const server = dgram.createSocket('udp4')

  server.on('error', (err) => {
    console.log(`server error:\n${err.stack}`)
    server.close()
  });

  server.on('message', (msg, rinfo) => {
    console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`)
  });

  server.on('listening', () => {
    const address = server.address()
    console.log(`UDP server listening ${address.address}:${address.port}`)
  })

  server.bind(UDP_LOCAL_PORT)
  // Prints: server listening 0.0.0.0:41234
}

export default initUDPSev