const router = require('express').Router()

const example = require('./example')
router.use('/example', example)

module.exports = router
