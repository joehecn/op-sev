
import path from 'path'
import { fileURLToPath } from 'url'

import Koa from 'koa'

import koaStatic from 'koa-static'
import cors from 'koa2-cors'
import bodyparser from 'koa-bodyparser'

import {
  lastHandingErrors,
  getDbModel,
  setSendUDPMsgFunc,
  router
} from './middlewares/index.js'

const app = new Koa()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app
  .use(lastHandingErrors)
  .use(koaStatic(path.resolve(__dirname, '../public'), {
    setHeaders (res) {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With')
      res.setHeader('Access-Control-Allow-Methods', 'GET')
    }
  }))
  .use(getDbModel)
  .use(setSendUDPMsgFunc)
  .use(cors({
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
    maxAge: 100,
    credentials: true,
    allowMethods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'db', 'Accept', 'X-Custom-Header', 'anonymous', 'x-requested-with', 'origin', 'lang']
  }))
  .use(bodyparser({
    enableTypes: ['json', 'form', 'text']
  }))
  .use(router.routes())
  .use(router.allowedMethods())

export default app