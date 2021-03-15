const router = require('express').Router()
const { ExampleController } = require('../controllers')

router.get('/', ExampleController.getExample)
router.post('/', ExampleController.createExample)
router.put('/', ExampleController.updateExample)
router.delete('/', ExampleController.deleteExample)

module.exports = router
