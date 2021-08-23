
import WebSocket from 'ws'
import emitter from './emitter.js'

const webSocketApi = wss => {
  emitter.on('a', data => {
    wss.clients.forEach(client => {
      console.log({ readyState: client.readyState })
      if (client.readyState === WebSocket.OPEN) {
        client.send(data)
      }
    })
  })

  // wss.on('connection', ws => {
  //   ws.on('message', message => {
  //     console.log('received: ', message)
  //   })
  // })
}

export default webSocketApi