const { v4: uuid } = require('uuid')
const { notFound } = require('../utils/responses')

function exampleFactory ({ name, description }) {
  return {
    id: uuid(),
    created: Date.now(),
    name,
    description,
  }
}
const examples = {}

class ExampleService {
  static async getExample (id) {
    const example = examples[id]
    if (!example) return notFound(`Example with id: ${id}`)

    return example
  }

  static async getExamples () {
    const result = Object.values(examples)

    return result
  }

  static async createExample (data) {
    const example = exampleFactory(data)

    const { id } = example
    examples[id] = example

    return example
  }

  static async updateExample (id, data) {
    const { name, description } = data

    const example = examples[id]
    if (!example) return notFound(`Example with id: ${id}`)

    if (name) example.name = name
    if (description) example.description = description

    return example
  }

  static async deleteExample (id) {
    const example = examples[id]
    if (!example) return notFound(`Example with id: ${id}`)

    delete examples[id]

    return true
  }
}

module.exports = ExampleService
