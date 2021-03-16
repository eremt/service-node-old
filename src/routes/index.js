const router = require('express').Router()

const example = require('./example.routes')
router.use('/examples', example)

module.exports = router
