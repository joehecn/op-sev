
import {
  add as _add,
  remove as _remove,
  update as _update,
  findOne as _findOne,
  list as _list
} from '../services/Card.js'

import {
  add as addToHistory
} from '../services/CardHistory.js'

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

  // data 是 oldCard
  console.log({ param, data })

  if (param.cardNo !== data.cardNo) {
    // 保存到换卡历史
    await addToHistory({
      cardId: data._id,
      cardNo: data.cardNo,
      newCardNo: param.cardNo,
      doorIds: data.doorIds,
      username:data.username,
      realname:data.realname,
      userInfo:data.userInfo
    }, ctx)
  }

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
