const example = {
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  created: new Date(),
  name: 'Example',
  description: 'An example',
}

class ExampleService {
  static async getExample () {
    return example
  }

  static async getExamples () {
    return [example]
  }

  static async createExample () {
    return example
  }

  static async updateExample () {
    return example
  }

  static async deleteExample () {
    return example
  }
}

module.exports = ExampleService
