
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

import { getConn } from './conn.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const schemaPath = path.resolve(__dirname, '../schemas/')
// console.log(pathToFileURL(schemaPath))
const models = {}

const _createModel = async schemaName => {
  const Schema = () => import(`${pathToFileURL(schemaPath)}/${schemaName}.js`)
  const conn = getConn()
  const schema = await Schema()
  return conn.model(schemaName, schema.default)
}

const getModel = async schemaName => {
  if (!models[schemaName]) {
    models[schemaName] = await _createModel(schemaName)
  }

  return models[schemaName]
}

export default getModel
