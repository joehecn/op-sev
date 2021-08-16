

import ERRORS from './errors.js'

const SEV_PORT = 4003
const UDP_LOCAL_PORT = 41234
const UDP_REMOTE_IP = 'localhost'
const UDP_REMOTE_PORT = 41235

const DB_HOST = 'mongodb://opDbAdmin:FfdslaewqQQ2@47.244.251.53:27017/'

// jwt
const PASSWORD_SALT = 'salt for one punch, which is salty'
// const JWT_EXPIRE = 365 * 24 * 60 * 60 * 1000 // jwt有效期：1年
// const JWT_EXPIRE = 60 * 1000 // jwt有效期：1分钟
const JWT_EXPIRE = 15 * 24 * 60 * 60 * 1000 // jwt有效期：15天
const JWT_SECRET = 'you can never image such a long secret for a json web token'

const getDbConnectStr = dbName => {
  return `${DB_HOST}${dbName}?authSource=admin`
}

export {
  SEV_PORT,

  // node udp server
  UDP_LOCAL_PORT,
  // vb udp server
  UDP_REMOTE_IP,
  UDP_REMOTE_PORT,

  // jwt
  PASSWORD_SALT,
  JWT_EXPIRE,
  JWT_SECRET,

  ERRORS,

  getDbConnectStr
}
