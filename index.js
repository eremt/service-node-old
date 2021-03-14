const server = require('./server')

const {
  NODE_ENV,
  HOST,
  PORT,
  DOCS,
  npm_package_name: name,
  npm_package_version: version,
} = process.env
const isDev = NODE_ENV === 'development'

const serverInfo = {
  name,
  version,
}
const urlDocumentation = `http://${HOST}:${PORT}${DOCS}`
if (isDev) serverInfo.documentation = urlDocumentation

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
    console.log(`Documentation running on ${urlDocumentation}`)
  }
})
