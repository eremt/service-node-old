const redis = require('../redis')
const { log } = require('../utils/logger')

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
}

module.exports = SessionService
