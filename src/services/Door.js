
import {
  set as setDoor,
  del as delDoor
} from '../redis/index.js'

const add = async (param, ctx) => {
  const model = await ctx.model('Door')
  const res = new model(param)
  const created = await res.save()

  const { ip } = created
  await setDoor(`door.${ip}`, JSON.stringify(created))

  return created._doc
}

const remove = async (query, ctx) => {
  const model = await ctx.model('Door')
  const res = await model.findOneAndRemove(query)

  if (res) {
    const { ip } = res
    await delDoor(`door.${ip}`)
  }

  return res
}

const update = async (query, set, ctx) => {
  const model = await ctx.model('Door')
  const res = await model.findOneAndUpdate(query, {
    $set: set
  }, { upsert: false, new: true })

  if (res) {
    await delDoor(`card.${res.ip}`)

    const door = await model.findOne(query)
    const { ip } = door
    await setDoor(`door.${ip}`, JSON.stringify(door))
  }

  return res
}

const findOne = async (query, ctx) => {
  const model = await ctx.model('Door')
  const res = await model.findOne(query)
  return res
}

const list = async (query, ctx) => {
  const model = await ctx.model('Door')
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
