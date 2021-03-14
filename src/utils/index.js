function typeOf (input) {
  let type = typeof input

  if (Array.isArray(input)) {
    type = 'array'
  }

  return type
}

module.exports = {
  typeOf,
}
