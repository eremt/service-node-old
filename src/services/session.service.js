const redis = require('../redis')
const { v4: uuid } = require('uuid')
const { log } = require('../utils/logger')

const { NODE_ENV } = process.env
const cookieConfig = {
  httpOnly: true,
  maxAge: 1000 * 60,
  secure: NODE_ENV !== 'development',
}

class SessionService {
  static async get (id) {
    try {
      let data = await redis.get(id)
      if (data) data = JSON.parse(data)
      return data
    } catch (error) {
      log(error)
    }
  }

  static async set (id, data) {
    try {
      return redis.set(id, JSON.stringify(data))
    } catch (error) {
      log(error)
    }
  }

  static async del (id) {
    try {
      return redis.del(id)
    } catch (error) {
      log(error)
    }
  }

  static middleware (options = { ...cookieConfig }) {
    return async function (req, res, next) {
      let { token } = req.cookies

      if (!token) {
        token = uuid()
        await SessionService.set(token, {})
        res.cookie('token', token, options)
      }

      next()
    }
  }
}

module.exports = SessionService
