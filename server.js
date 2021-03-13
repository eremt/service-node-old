const express = require('express')
const router = require('./src/routes')

const server = express()
server.use(router)

const {
  PORT,
  HOST,
} = process.env

server.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`)
})

module.exports = server
