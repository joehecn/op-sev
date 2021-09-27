
import { ERRORS } from '../config/index.js'
import { writeErr } from '../util/write.js'

// code: 11000
const coverCode11000 = e => {
  const { keyValue } = e

  if (!keyValue) return { code: 11000, message: 'Duplicate key' }

  const key = Object.keys(keyValue)[0]
  const value = keyValue[key]

  const message = `Duplicate ${key}: ${value}`
  return { code: 11000, message }
}

/**
 * 最后一次拦截错误
 */
const lastHandingErrors = async (ctx, next) => {
  try {
    await next()
  } catch (e) {
    const { code, message } = e

    // code: 11000
    if (code === 11000) {
      ctx.status = 403
      ctx.body = coverCode11000(e, ctx)
      return
    }

    // 新 error
    if (ERRORS[code]) {
      ctx.status = 403

      ctx.body = {
        code: code,
        message
      }
      return
    }

    if (ERRORS[message]) {
      ctx.status = 403
      ctx.body = ERRORS[message]
    } else {
      // unknown error
      console.error('---- lastHandingErrors unknown error:', e)

      ctx.status = 503
      ctx.body = { code: 1000001, message: message || 'unknown error' }

      // 记录未知错误日志
      writeErr({
        ctx: {
          message,
          token: ctx.header.authorization,
          url: ctx.url,
          query: ctx.request.query,
          body: ctx.request.body
        },
        stack: e.stack
      })
    }
  }
}

export default lastHandingErrors
