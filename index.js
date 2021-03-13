const server = require('./server')

const {
  NODE_ENV,
  HOST,
  PORT,
} = process.env
const isDev = NODE_ENV === 'development'

server.listen(PORT, HOST, () => {
  if (isDev) {
    console.log(`Server running on http://${HOST}:${PORT}`)
    console.log(`Documentation running on http://${HOST}:${PORT}/documentation`)
  }
})
