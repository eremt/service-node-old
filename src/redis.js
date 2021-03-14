const Redis = require('ioredis')
const { log } = require('./utils/logger')

const {
  REDIS_HOST,
  REDIS_PORT,
  REDIS_USER,
  REDIS_PASSWORD,
} = process.env

const options = {
  host: REDIS_HOST,
  port: REDIS_PORT,
}
if (REDIS_USER) {
  options.user = REDIS_USER
}
if (REDIS_PASSWORD) {
  options.password = REDIS_USER
}

const redis = new Redis(options)
redis.on('connect', () => {
  log('Connected to Redis.')
})

module.exports = redis
