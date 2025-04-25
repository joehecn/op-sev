
import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ClockInSchema = new Schema({
  cardId: {
    type: ObjectId,
    ref: 'Card'
  },
  // 八达通卡号, 通过读卡器获取
  // "000000000183BD5C"
  cardNo: {
    type: String
  },
  // 拥有的门 (数组)
  doorIds: [{
    type: ObjectId,
    ref: 'Door'
  }],
  // 用户名
  username: {
    type: String,
    trim: true
  },
  // 姓名
  realname: {
    type: String,
    trim: true
  },
  // 住户信息
  userInfo: {
    type: String
  },

  // 开的门
  doorId: {
    type: ObjectId,
    ref: 'Door'
  },
  // 门禁编码
  doorNo: {
    type: String,
    trim: true
  },
  // 楼号
  building: {
    type: String,
    trim: true
  },
  // 单元号
  unit: {
    type: String,
    trim: true
  },

  pass: {
    type: Boolean,
    default: true
  }
}, {
  versionKey: false,
  // 打卡时间
  timestamps: true
})

export default ClockInSchema
