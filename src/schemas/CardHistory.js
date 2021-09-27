
import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const CardHistorySchema = new Schema({
  cardId: {
    type: ObjectId,
    ref: 'Card',
    required: true
  },
  // 八达通卡号, 通过读卡器获取
  // "000000000183BD5C"
  cardNo: {
    type: String,
    required: true
  },
  newCardNo: {
    type: String,
    required: true
  },
  // 拥有的门 (数组)
  doorIds: [{
    type: ObjectId,
    ref: 'Door'
  }],
  // 用户名
  username: {
    type: String,
    trim: true,
    required: true
  },
  // 姓名
  realname: {
    type: String,
    trim: true,
    required: true
  },
  // 住户信息
  userInfo: {
    type: String
  }
}, {
  versionKey: false,
  // 换卡时间
  timestamps: true
})

export default CardHistorySchema
