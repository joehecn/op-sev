
import {
  set as setCard,
  del as delCard
} from '../redis/index.js'

const add = async (param, ctx) => {
  const model = await ctx.model('Card')
  const res = new model(param)
  const created = await res.save()

  const { cardNo } = created
  await setCard(`card.${cardNo}`, JSON.stringify(created))

  return created._doc
}

const remove = async (query, ctx) => {
  const model = await ctx.model('Card')
  const res = await model.findOneAndRemove(query)

  if (res) {
    const { cardNo } = res
    await delCard(`card.${cardNo}`)
  }

  return res
}

const update = async (query, set, ctx) => {
  const model = await ctx.model('Card')
  const res = await model.findOneAndUpdate(query, {
    $set: set
  }, { upsert: false, new: false })

  if (res) {
    await delCard(`card.${res.cardNo}`)

    const card = await model.findOne(query)
    const { cardNo } = card
    await setCard(`card.${cardNo}`, JSON.stringify(card))
  }

  return res
}

const findOne = async (query, ctx) => {
  const model = await ctx.model('Card')
  const res = await model.findOne(query)
  return res
}

const list = async (query, ctx) => {
  await ctx.model('Door')
  const model = await ctx.model('Card')
  const res = await model
    .find(query)
    .populate('doorIds')
    .sort({ _id: -1 })
    .exec()
  return res
}

const listCard = async (query, ctx) => {
  const model = await ctx.model('Card')
  const res = await model.find(query)
  return res
}

export {
  add,
  remove,
  update,
  findOne,
  list,
  listCard
}
