
import jwt from 'jsonwebtoken'
import { JWT_EXPIRE, JWT_SECRET } from '../config/index.js'

/**
 *
 * @param {String} _id
 * 用户 _id
 *
 * @return {String} token
 * @return {Date} now
 * for update lastLoginTime
 */
const getToken = (_id, jwtExpire) => {
  const now = Date.now() // 时间戳 1562865659978
  const _je = jwtExpire || JWT_EXPIRE
  const token = jwt.sign({
    _id,
    iat: now,
    expire: now + _je
  }, JWT_SECRET)

  return { token }
}

/**
 * 采用同步方案
 * @param {String} token
 * @return {Object} decoded
 * { _id, iat, expire }
 */
const getTokenValue = token => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return decoded
  } catch (error) {
    // Error token invalid
    throw Error(10006)
  }
}

export {
  getToken,
  getTokenValue
}
