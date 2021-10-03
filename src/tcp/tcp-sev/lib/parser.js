
import d from 'debug'
import { EventEmitter } from 'events'
import ByteBuffer from 'byte'

const debug = d('net:parser')

export default class Parser extends EventEmitter {
  constructor(options) {
    super()

    // [
    //   { name: 'reqType', type: 'UInt8', size: 1, desc: '请求类型' }
    //   { name: 'reqId', type: 'UInt32', size: 4, desc: '请求包id or 响应包关联的请求包id' },
    //   { name: 'packetType, type: 'UInt8', size: 1, desc: '包类型' }
    // ]

    // copy passed in fields
    this.fields = []
    for (const field of options.fields) {
      const f = Object.assign({}, field)
      this._resetField(f)
      this.fields.push(f)
    }
  }

  get currentField() {
    for (const field of this.fields) {
      if (!field.parsed) {
        return field
      }
    }
    return null
  }

  parse(chunk) {
    const field = this.currentField

    if (!field) {
      return this._reset().parse(chunk)
    }

    const { size, buf } = field
    buf.put(chunk)

    const offset = buf.position()
    if (offset < size) {
      return null
    }

    // 读取field值
    this._parseFieldValue(field)
    debug('parsed field, name: %s, value: %s', field.name, field.value)
    this.emit('field', field)

    const left = field.buf.copy(size)

    // 包解析完毕
    if (!this.currentField) {
      const packet = this.fields.reduce((obj, { name, value }) => {
        obj[name] = value
        return obj
      }, {})
      this.emit('packet', packet)
      debug('emit packet: %j', packet)
      this._reset()
      return left
    }

    return this.parse(left)
  }

  _reset() {
    // 重置field状态
    for (const field of this.fields) {
      this._resetField(field)
    }
    return this
  }

  _resetField(field) {
    field.value = null
    field.buf = new ByteBuffer({ size: field.size })
    field.parsed = false
  }

  _parseFieldValue(field) {
    const { buf, type } = field
    const index = 0
    const value = buf[`get${type}`].apply(buf, [index])
    field.value = value
    field.parsed = true
    return value
  }
}
