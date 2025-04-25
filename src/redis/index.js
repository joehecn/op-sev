
import { createClient } from 'redis'
import { REDIS_URL as url } from '../config/index.js'
import getModel from '../db/model.js'

import {
  list as listDoor
} from '../services/Door.js'
import {
  listCard,
  update as updateCard
} from '../services/Card.js'
import {
  add as addHistory
} from '../services/CardHistory.js'

const _init = async () => {
  const ctx = {
    model: getModel
  }

  const doorArr = await listDoor({}, ctx)
  const cardArr = await listCard({}, ctx)
  console.log({ doorCount: doorArr.length, cardCount: cardArr.length })

  const client = createClient({ url })
  await client.connect()

  // 清除 client
  // let keys = await client.keys('*')
  // console.log(keys)
  await client.flushAll()
  // keys = await client.keys('*')
  // console.log(keys)

  // for (let i = 0, len = keys.length; i < len; i++) {
  //   const key = keys[i]
  //   await client.del(key)
  // }

  for (let i = 0, len = doorArr.length; i < len; i++) {
    const door = doorArr[i]
    await client.set(`door.${door.ip}`, JSON.stringify(door))
  }

  for (let i = 0, len = cardArr.length; i < len; i++) {
    const card = cardArr[i]
    await client.set(`card.${card.cardNo}`, JSON.stringify(card))
  }
}

export const init = async () => {
  try {
    await _init()
  } catch (error) {
    // TODO: handler error
    console.error(error)
  }
}

// 旧卡换新卡
export const replaceCard = async ({ oldCardId, newCardId, newCardType, card }, ctx) => {
  await updateCard({ _id: card._id }, { cardNo: newCardId, cardType: newCardType }, ctx)

  const client = createClient({ url })
  await client.connect()

  await client.del(`card.${oldCardId}`)
  await client.set(`card.${newCardId}`, JSON.stringify({
    _id: card._id,
    cardNo: newCardId,
    cardType: newCardType,
    doorIds: card.doorIds,
    username: card.username,
    realname: card.realname,
    userInfo: card.userInfo
  }))

  await addHistory({
    cardId: card._id,
    cardNo: oldCardId,
    newCardNo: newCardId,
    doorIds: card.doorIds.map(({ _id }) => _id),
    username: card.username,
    realname: card.realname,
    userInfo: card.userInfo
  }, ctx)
}

export const set = async (key, value) => {
  const client = createClient({ url })
  await client.connect()

  await client.set(key, value)
}

export const del = async key => {
  const client = createClient({ url })
  await client.connect()

  await client.del(key)
}