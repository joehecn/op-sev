
import ERRORS from './errors.js'

const NODE_ENV = process.env.NODE_ENV

const SEV_PORT = 4003
const UDP_LOCAL_PORT = 41234

let redis = 'redis_master'
let domain = 'op-db'

if (NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  redis = 'localhost'
  domain = '47.244.251.53'
}

console.log({ NODE_ENV, redis, domain })

const REDIS_URL = `redis://${redis}:6379`
const DB_HOST = `mongodb://opDbAdmin:FfdslaewqQQ2@${domain}:27017/`

// jwt
const PASSWORD_SALT = 'salt for one punch, which is salty'
const JWT_EXPIRE = 15 * 24 * 60 * 60 * 1000 // jwt有效期：15天
const JWT_SECRET = 'you can never image such a long secret for a json web token'

const getDbConnectStr = dbName => {
  return `${DB_HOST}${dbName}?authSource=admin`
}

export {
  REDIS_URL,

  SEV_PORT,
  // node udp server
  UDP_LOCAL_PORT,
  // jwt
  PASSWORD_SALT,
  JWT_EXPIRE,
  JWT_SECRET,

  ERRORS,

  getDbConnectStr
}
