
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const DoorSchema = new Schema({
  // IP
  ip: {
    type: String,
    trim: true,
    required: true
  },
  // 接收消息端口
  receivePort: {
    type: String,
    trim: true
    // required: true
  },
  // 发送消息端口
  sendPort: {
    type: String,
    trim: true
    // required: true
  },
  // 門禁編碼
  doorNo: {
    type: String,
    trim: true,
    required: true
  },
  // 樓號
  building: {
    type: String,
    trim: true,
    required: true
  },
  // 單元號
  unit: {
    type: String,
    trim: true,
    required: true
  }
  // // 废弃, 弃用
  // deprecated: {
  //   type: Boolean,
  //   default: false
  // }
}, {
  versionKey: false
})

DoorSchema.index({ doorNo: 1 }, { unique: true })
DoorSchema.index({ ip: 1, receivePort: 1 }, { unique: true })
DoorSchema.index({ ip: 1, sendPort: 1 }, { unique: true })
DoorSchema.index({ building: 1, unit: 1 }, { unique: true })

export default DoorSchema
