const router = require('express').Router()
const { ExampleController } = require('../controllers')

router.get('/', ExampleController.get)
router.post('/', ExampleController.post)
router.put('/', ExampleController.put)
router.delete('/', ExampleController.delete)

module.exports = router
