const swaggerJSDoc = require('swagger-jsdoc')

const {
  npm_package_name: title,
  npm_package_version: version,
} = process.env

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title,
      version,
    },
    basePath: '/',
  },
  apis: ['./src/**/*.js'],
})

module.exports = swaggerSpec
