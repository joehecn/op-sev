
import app from './app.js'

import { SEV_PORT } from './config/index.js'

import sendUDPMsg from './udp/server.js'

const main = async () => {
  sendUDPMsg('ahah')
  app.listen(SEV_PORT, console.log('---- server is run on port', SEV_PORT))
  return true
}

main().then(res => console.log('---- server init', res))