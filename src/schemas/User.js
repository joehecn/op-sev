
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  userName: {
    type: String,
    lowercase: true,
    trim: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    required: true
  }
}, {
  versionKey: false
})

UserSchema.index({ userName: 1 }, { unique: true })
export default UserSchema
