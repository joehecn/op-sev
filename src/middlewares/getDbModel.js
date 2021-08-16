
import getModel from '../db/model.js'

const getDbModel = async (ctx, next) => {
  ctx.model = getModel
  if (next) {
    await next()
  }
}

export default getDbModel
