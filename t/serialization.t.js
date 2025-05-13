// node t/serialization.t.js

import ByteBuffer from 'byte'

const MAX_PACKET_ID = 2147483647

const _fields = [
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

let _opaque = 0

function encode() {
  throw new Error('not implemented')
}

function pack(buf, info) {
  const { reqType = 0, packetType = 0 } = info
  let { reqId } = info

  if (reqType === 0) {
    // 如果是普通请求，则为他生成reqId
    reqId = _generateReqId()
  } else if (reqType === 1) {
    // 如果是响应请求，则reqId不能为空
    assert(isNumber(reqId), 'reqId should be number when reqType = 1!')
  } else {
    throw new Error('invalid reqType, should be either 0 or 1!')
  }

  info.reqId = reqId
  info.packetType = packetType

  const headerBuf = new ByteBuffer({ size: 6 })
  for (const field of _fields) {
    console.log(field.type, field.name, info[field.name])
    headerBuf[`put${field.type}`].apply(headerBuf, [info[field.name]])
  }
  console.log({ headerBuf: headerBuf.toString('hex') })
  return {
    id: reqId,
    packet: Buffer.concat([headerBuf.copy(), buf])
  }
}

function _generateReqId() {
  if (_opaque === MAX_PACKET_ID) {
    _opaque = 1
  } else {
    ++_opaque
  }
  return _opaque

}

function serialization(data, info) {
  let bodyBuf = Buffer.alloc(0)
  const headerBuf = Buffer.alloc(4)

  bodyBuf = data != null ? encode(data) : Buffer.alloc(0)
  headerBuf.writeUInt32BE(bodyBuf.length)
  const totalBuf = Buffer.concat([headerBuf, bodyBuf])
  console.log({ totalBuf: totalBuf.toString('hex') })

  const { id, packet } = pack(totalBuf, info)
  console.log({ data: packet.toString('hex') })

  return id
}

const res1 = serialization(null, { reqType: 0, packetType: 1 })
console.log({ res1 })
