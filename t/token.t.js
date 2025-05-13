
// node t/token.t.js
import jwt from 'jsonwebtoken'

const JWT_EXPIRE = 10 * 365 * 24 * 60 * 60 * 1000 // jwt有效期：15天
const JWT_SECRET = 'you can never image such a long secret for a json web token'

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

const getTokenValue = token => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    return decoded
  } catch (error) {
    // Error token invalid
    throw Error(10006)
  }
}

// console.log({ token: getToken('60d87a7c0b70430a59a8f740') })
console.log({ token: getToken('680efb79728a5b11b6fbf657') })

// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGQ4N2E3YzBiNzA0MzBhNTlhOGY3NDAiLCJpYXQiOjE2MzI5NTUxMzcxNjUsImV4cGlyZSI6MTk0ODMxNTEzNzE2NX0.pWtJYkaM4lpoaci199wmZF8miyQIu566tyHuTQ6LBuY'

console.log(getTokenValue('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGQ4N2E3YzBiNzA0MzBhNTlhOGY3NDAiLCJpYXQiOjE2MzI5NTUxMzcxNjUsImV4cGlyZSI6MTk0ODMxNTEzNzE2NX0.pWtJYkaM4lpoaci199wmZF8miyQIu566tyHuTQ6LBuY'))
