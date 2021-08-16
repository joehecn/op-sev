
import path from 'path'
import { fileURLToPath } from 'url'

import { getConn } from './conn.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const schemaPath = path.resolve(__dirname, '../schemas/')

const models = {}

const _createModel = async schemaName => {
  const Schema = () => import(`${schemaPath}/${schemaName}.js`)
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
