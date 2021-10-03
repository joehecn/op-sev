
export const FIELDS = [
  {
    name: 'reqType',
    type: 'UInt8',
    size: 1,
    desc: '请求类型：0 - 请求，1 - 响应'
  },

  {
    name: 'reqId',
    type: 'UInt32',
    size: 4,
    desc: '请求包id or 响应包关联的请求包id'
  },

  {
    name: 'packetType',
    type: 'UInt8',
    size: 1,
    desc: '包类型：0 - 普通请求 1 - 心跳请求'
  }
]

export const DISCONNECT = 'disconnect'
export const DISCONNECTING = 'disconnecting'
export const CONNECT = 'connect'
export const CONNECTING = 'connecting'

export const MAX_PACKET_ID = 2147483647 // Math.pow(2, 32) - 1

export const IDLE_TIMEOUT = 30 * 1000
export const FINWAIT_TIMEOUT = 2 * 60 * 1000

export const HEARTBEAT_INTERVAL = 5 * 1000
export const HEARTBEAT_TIMEOUT = 3 * 1000
export const HEARTBEAT_TIMEOUT_LIMIT = 3

export const LENGTH_BASED_PACKET_LENGTH = 4

