const router = require('express').Router()

const example = require('./example')
router.use('/examples', example)

module.exports = router
