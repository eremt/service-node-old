const router = require('express').Router()

const {
  npm_package_name: name,
  npm_package_version: version,
} = process.env

router.get('/', (req, res) => {
  res.json({
    name,
    version,
  })
})

const isDev = process.env.NODE_ENV === 'development'
if (isDev) {
  const swaggerUi = require('swagger-ui-express')
  const swagger = require('../../swagger')
  router.use('/documentation', swaggerUi.serve, swaggerUi.setup(swagger))
}

router.use((req, res) => res.status(404).json({ code: 404, message: 'Not found.' }))

module.exports = router
