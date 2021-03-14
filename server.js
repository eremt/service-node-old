const express = require('express')
require('./src/redis')

const server = express()

const bodyParser = require('body-parser')
server.use(bodyParser.json())

const cookieParser = require('cookie-parser')
server.use(cookieParser())

const { logRequests } = require('./src/utils/logger')
server.use(logRequests())

const router = require('./src/routes')
server.use(router)

module.exports = server
