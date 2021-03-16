const router = require('express').Router()
const { ExampleController } = require('../controllers')

router.get('/', ExampleController.getExamples)
router.get('/:id', ExampleController.getExample)
router.post('/', ExampleController.createExample)
router.put('/:id', ExampleController.updateExample)
router.delete('/:id', ExampleController.deleteExample)

module.exports = router
