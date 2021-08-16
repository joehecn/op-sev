
const add = async (param, ctx) => {
  const model = await ctx.model('CardHistory')
  const res = new model(param)
  const created = await res.save()
  return created._doc
}

const remove = async (query, ctx) => {
  const model = await ctx.model('CardHistory')
  const res = await model.deleteOne(query)
  return res
}

const update = async (query, set, ctx) => {
  const model = await ctx.model('CardHistory')
  const res = await model.findOneAndUpdate(query, {
    $set: set
  }, { upsert: false, new: true })
  return res
}

const findOne = async (query, ctx) => {
  const model = await ctx.model('CardHistory')
  const res = await model.findOne(query)
  return res
}

const list = async (query, ctx) => {
  const model = await ctx.model('CardHistory')
  const res = await model.find(query)
  return res
}

export {
  add,
  remove,
  update,
  findOne,
  list
}
