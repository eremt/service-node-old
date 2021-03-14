const express = require('express')

const server = express()

const bodyParser = require('body-parser')
server.use(bodyParser.json())

const cookieParser = require('cookie-parser')
server.use(cookieParser())

const router = require('./src/routes')
server.use(router)

module.exports = server
