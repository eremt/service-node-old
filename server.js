const express = require('express')
require('./src/redis')

const server = express()

const isDev = process.env.NODE_ENV === 'development'

if (!isDev) {
  // TODO: for now disable helmet in dev because it breaks swagger, investigate
  const helmet = require('helmet')
  server.use(helmet({
    referrerPolicy: false,
  }))
}

const bodyParser = require('body-parser')
server.use(bodyParser.json())

const cookieParser = require('cookie-parser')
server.use(cookieParser())

const { logRequests } = require('./src/utils/logger')
server.use(logRequests())

const router = require('./src/routes')
server.use(router)

module.exports = server
