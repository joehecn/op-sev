
import {
  add as _add,
  remove as _remove,
  update as _update,
  findOne as _findOne,
  list as _list
} from '../services/Door.js'

import {
  replaceCard
} from '../redis/index.js'

import {
  add as addClockIn
} from '../services/ClockIn.js'

const doorMap = {}

const add = async ctx => {
  const param = ctx.request.body
  // console.log({ param })
  const data = await _add(param, ctx)

  ctx.body = {
    code: 0,
    message: '',
    data
  }
}

const remove = async ctx => {
  const query = ctx.request.body
  // console.log({ query })
  const data = await _remove(query, ctx)

  ctx.body = {
    code: 0,
    message: '',
    data
  }
}

const update = async ctx => {
  const param = ctx.request.body
  // console.log({ param })
  const _id = param._id
  const data = await _update({ _id }, param, ctx)

  ctx.body = {
    code: 0,
    message: '',
    data
  }
}

const findOne = async ctx => {
  const query = ctx.request.query
  const data = await _findOne(query, ctx)

  ctx.body = {
    code: 0,
    message: '',
    data
  }
}

const list = async ctx => {
  const query = ctx.request.query
  console.log({ query })
  const res = await _list(query, ctx)

  ctx.body = {
    code: 0,
    message: '',
    data: { list: res, doorMap }
  }
}

const _handleMsg = async ({ method, arg }, ctx) => {
  if (method === 'replaceCard') {
    await replaceCard(arg, ctx)
  } else if (method === 'addClockIn') {
    await addClockIn(arg, ctx)
  }
}

const lifecycle = async ctx => {
  const now = Date.now()
  const { id, ip, serialPort, count, msgs } = ctx.request.body
  console.log({ id, ip, serialPort, count, msgs })

  doorMap[ip] = { count, serialPort, now }

  if (msgs) {
    for (let i = 0, len = msgs.length; i < len; i++) {
      const msg = msgs[i]
      await _handleMsg(msg, ctx)
    }
  }

  ctx.body = {
    code: 0,
    message: '',
    data: { id }
  }
}

export {
  add,
  remove,
  update,
  findOne,
  list,
  lifecycle
}
