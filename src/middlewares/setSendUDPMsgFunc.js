
import { sendUDPMsg } from '../udp/server.js'

const setSendUDPMsgFunc = async (ctx, next) => {
  ctx.sendUDPMsg = sendUDPMsg
  if (next) {
    await next()
  }
}

export default setSendUDPMsgFunc
