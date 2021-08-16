
/**
 * 数据库连接模块
 * 通过数据库名称获取连接
 */
 import mongoose from 'mongoose'
 import { getDbConnectStr } from '../config/index.js'
 
 mongoose.Promise = global.Promise
 
 let conn = null
 
 const _createConn = dbName => {
   // 忽略警告:
   // current URL string parser is deprecated, and will be removed in a
   // future version. To use the new parser, pass option
   // { useNewUrlParser: true } to MongoClient.connect.
   // 忽略警告:
   // collection.ensureIndex is deprecated. Use createIndexes instead.
   // { 'useCreateIndex', true }
   const str = getDbConnectStr(dbName)
   return mongoose.createConnection(str, {
     useUnifiedTopology: true,
     useNewUrlParser: true,
     useCreateIndex: true,
     useFindAndModify: false,
     autoIndex: true,
     socketTimeoutMS: 360000,
     keepAlive: true,
     connectTimeoutMS: 300000
   })
 }
 
 const getConn = () => {
   if (!conn) {
     conn = _createConn('octopus')
   }
 
   return conn
 }
 
 const closeConnection = async () => {
   if (conn) {
     await conn.close()
   }
 }
 
 export {
   getConn,
 
   // for testing
   closeConnection
 }
 