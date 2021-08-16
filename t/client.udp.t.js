import sendUDPMsg from '../src/udp/client.js'
const message = Buffer.from('Some joe bytes')
sendUDPMsg(message)