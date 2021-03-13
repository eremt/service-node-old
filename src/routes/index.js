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

router.use((req, res) => res.status(404).json({ code: 404, message: 'Not found.' }))

module.exports = router
