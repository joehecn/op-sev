
import dgram from 'dgram'
import {
  UDP_REMOTE_IP,
  UDP_REMOTE_PORT,
} from '../config/index.js'

const sendUDPMsg = message => {
  const client = dgram.createSocket('udp4')
  client.send(message, UDP_REMOTE_PORT, UDP_REMOTE_IP, err => {
    console.log({ err })
    client.close()
  })
}

export default sendUDPMsg