
import Router from 'koa-router'

import { login } from '../controllers/User.js'
import jwt from '../util/jwt.js'
import * as door from '../controllers/Door.js'
import * as card from '../controllers/Card.js'
import * as history from '../controllers/CardHistory.js'
import * as clockin from '../controllers/ClockIn.js'

import emitter from '../util/emitter.js'

import {
  list as getInfo,
  getConn,
  sendMsg
} from '../tcp/server.js'

let index = 0

const send = (conn, ctx) => {
  console.log('---- send', Date.now())
  return new Promise((resolve, reject) => {
    const t = `${Date.now()}_${index++}`

    emitter.once(t, data => {
      if (data.message) {
        reject(data)
        return
      }

      console.log('---- send resolve', Date.now())
      resolve(data)
    })

    sendMsg(conn, `c=b&t=${t}&${ctx.querystring}`)
  })
}

const router = new Router()

// 网站根目录
router
  .get('/api', ctx => {
    ctx.body = 'api server is runing'
  })

  .post('/api/v1/login', login)

  .put('/api/v1/door/add', jwt, door.add)
  .delete('/api/v1/door/remove', jwt, door.remove)
  .post('/api/v1/door/update', jwt, door.update)
  .get('/api/v1/door/detail', jwt, door.findOne)
  .get('/api/v1/door/list', jwt, door.list)

  .put('/api/v1/card/add', jwt, card.add)
  .delete('/api/v1/card/remove', jwt, card.remove)
  .post('/api/v1/card/update', jwt, card.update)
  .get('/api/v1/card/detail', jwt, card.findOne)
  .get('/api/v1/card/list', jwt, card.list)

  .put('/api/v1/history/add', jwt, history.add)
  // .delete('/api/v1/history/remove', jwt, history.remove)
  // .post('/api/v1/history/update', jwt, history.update)
  .get('/api/v1/history/detail', jwt, history.findOne)
  .get('/api/v1/history/list', jwt, history.list)

  .put('/api/v1/clockin/add', jwt, clockin.add)
  // .delete('/api/v1/clockin/remove', jwt, clockin.remove)
  // .post('/api/v1/clockin/update', jwt, clockin.update)
  .get('/api/v1/clockin/detail', jwt, clockin.findOne)
  .get('/api/v1/clockin/list', jwt, clockin.list)

  .get('/api/v1/vue_api', jwt, async ctx => {
    console.log('---- vue_api in', Date.now())
    const { m } = ctx.query

    if (m === 'clientinfo') {
      const info = getInfo()
      ctx.body = {
        code: 0,
        data: info
      }
      return
    }

    if (m === 'version') {
      const { _id } = ctx.query

      // 查找 _id
      const conn = getConn(_id)

      if (!conn) {
        ctx.body = {
          code: 0,
          data: JSON.stringify({ message: 'TCP client is closed!' })
        }
        return
      }

      const data = await send(conn, ctx)

      console.log('---- vue_api out', Date.now())
      ctx.body = {
        code: 0,
        data
      }

      return
    }

    if (m === 'card') {
      const { _id } = ctx.query

      // 查找 _id
      const conn = getConn(_id)

      if (!conn) {
        ctx.body = {
          code: 0,
          data: JSON.stringify({ message: 'TCP client is closed!' })
        }
        return
      }

      const data = await send(conn, ctx)

      console.log('---- vue_api out', Date.now())
      ctx.body = {
        code: 0,
        data
      }
    }
  })

  .post('/api/v1/lifecycle', jwt, door.lifecycle)

export default router
