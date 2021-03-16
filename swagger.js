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
      description: `Documentation for ${title} API.`,
      contact: {
        name: 'Github',
        url: 'https://github.com/eremt/service-node',
      },
      license: {
        name: 'MIT',
        url: 'https://mit-license.org/',
      },
    },
    basePath: '/',
  },
  apis: ['./src/**/*.js'],
})

module.exports = swaggerSpec
