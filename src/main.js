
import http from 'http'
import { WebSocketServer } from 'ws'
import { init as initRedis } from './redis/index.js'
import app from './app.js'
import webSocketApi from './util/ws.js'

import { SEV_PORT } from './config/index.js'

const main = async () => {
  // init redis
  await initRedis()
  console.log('---- init redis')

  const server = http.createServer(app.callback())

  const wss = new WebSocketServer({ server })

  webSocketApi(wss)

  server.listen(SEV_PORT, console.log('---- server is run at', `http://localhost:${SEV_PORT}`))
  return true
}

main().then(res => console.log('---- server init', res))