const server = require('./server')

const {
  NODE_ENV,
  HOST,
  PORT,
  npm_package_name: name,
  npm_package_version: version,
} = process.env
const isDev = NODE_ENV === 'development'

const serverInfo = {
  name,
  version,
}
if (isDev) serverInfo.documentation = `http://${HOST}:${PORT}/documentation`
server.get('/', (req, res) => {
  res.json(serverInfo)
})

if (isDev) {
  const swaggerUi = require('swagger-ui-express')
  const swagger = require('./swagger')
  server.use('/documentation', swaggerUi.serve, swaggerUi.setup(swagger))
}

server.use((req, res) => res.status(404).json({ code: 404, message: 'Not found.' }))

server.listen(PORT, HOST, () => {
  if (isDev) {
    console.log(`Server running on http://${HOST}:${PORT}`)
    console.log(`Documentation running on http://${HOST}:${PORT}/documentation`)
  }
})
