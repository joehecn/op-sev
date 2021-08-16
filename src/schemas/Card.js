
import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const CardSchema = new Schema({
  // 八达通卡号, 通过读卡器获取
  // "000000000183BD5C"
  // 卡號
  cardNo: {
    type: String,
    required: true
  },
  // 拥有的门 (数组)
  // 門禁
  doorIds: [{
    type: ObjectId,
    ref: 'Door'
  }],
  // 用戶名
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
  // 住戶信息
  userInfo: {
    type: String
  }
  // // 废弃, 弃用
  // deprecated: {
  //   type: Boolean,
  //   default: false
  // }
}, {
  versionKey: false
})

CardSchema.index({ cardNo: 1 }, { unique: true })

export default CardSchema
