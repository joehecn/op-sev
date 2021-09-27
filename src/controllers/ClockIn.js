
import {
  add as _add,
  remove as _remove,
  update as _update,
  findOne as _findOne,
  list as _list
} from '../services/ClockIn.js'

const add = async ctx => {
  const param = ctx.request.body
  const data = await _add(param, ctx)

  ctx.body = {
    code: 0,
    message: '',
    data
  }
}

const remove = async ctx => {
  const query = ctx.request.body
  const data = await _remove(query, ctx)

  ctx.body = {
    code: 0,
    message: '',
    data
  }
}

const update = async ctx => {
  const param = ctx.request.body
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
  const data = await _list(query, ctx)

  ctx.body = {
    code: 0,
    message: '',
    data
  }
}

export {
  add,
  remove,
  update,
  findOne,
  list
}
