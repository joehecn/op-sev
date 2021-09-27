
import moment from 'moment'
import { getTokenValue } from './token.js'
import { findOne } from '../services/User.js'

const jwt = async (ctx, next) => {
  const token = ctx.header.authorization || null

  if (token === null) throw Error(10004)

  const { _id, expire } = getTokenValue(token)

  // expire 过期时间
  if (moment().isAfter(expire)) throw Error(10005)

  await findOne({ _id }, ctx)

  ctx.state.auth = { _id }

  await next()
}

export default jwt
