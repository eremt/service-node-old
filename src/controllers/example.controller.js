const { ExampleService } = require('../services')

const {
  NO_CONTENT,
  missingRequired,
  missingOptional,
  internalServerError,
} = require('../utils/responses')

/**
 * @swagger
 * components:
 *   id:
 *     type: object
 *     properties:
 *       id:
 *         type: string
 *         format: uuid
 *
 *   created:
 *     type: object
 *     properties:
 *       created:
 *         type: string
 *         format: date-time
 *
 *   name:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *         example: Example
 *
 *   description:
 *     type: object
 *     properties:
 *       description:
 *         type: string
 *         example: An example
 *
 *   exampleResponse:
 *     allOf:
 *       - $ref: '#/components/id'
 *       - $ref: '#/components/created'
 *       - $ref: '#/components/name'
 *       - $ref: '#/components/description'
 *
 *   examplesResponse:
 *     type: array
 *     items:
 *       $ref: '#/components/exampleResponse'
 *
 *   exampleRequest:
 *     allOf:
 *       - $ref: '#/components/name'
 *       - $ref: '#/components/description'
 */
class ExampleController {
  /**
   * @swagger
   * /examples/{id}:
   *   get:
   *     tags: [/examples]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *
   *     responses:
   *       200:
   *         description: Successful request
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/exampleResponse'
   *       404:
   *         $ref: '#/components/notFound'
   *       500:
   *         $ref: '#/components/internalServerError'
   */
  static async getExample (req, res) {
    try {
      const { id } = req.params
      const result = await ExampleService.getExample(id)
      if (result.code === 404) return res.status(result.code).json(result)

      res.json(result)
    } catch (error) {
      internalServerError(error, req, res)
    }
  }

  /**
   * @swagger
   * /examples:
   *   get:
   *     tags: [/examples]
   *
   *     responses:
   *       200:
   *         description: Successful request
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/examplesResponse'
   *       500:
   *         $ref: '#/components/internalServerError'
   */
  static async getExamples (req, res) {
    try {
      const result = await ExampleService.getExamples()

      res.json(result)
    } catch (error) {
      internalServerError(error, req, res)
    }
  }

  /**
   * @swagger
   * /examples:
   *   post:
   *     tags: [/examples]
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/exampleRequest'
   *
   *     responses:
   *       200:
   *         description: Successful request
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/exampleResponse'
   *       400:
   *         $ref: '#/components/missingRequired'
   *       500:
   *         $ref: '#/components/internalServerError'
   */
  static async createExample (req, res) {
    try {
      const { name, description } = req.body
      const error = missingRequired({ name })
      if (error) return res.status(error.code).json(error)

      const result = await ExampleService.createExample({ name, description })

      res.json(result)
    } catch (error) {
      internalServerError(error, req, res)
    }
  }

  /**
   * @swagger
   * /examples/{id}:
   *   put:
   *     tags: [/examples]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/exampleRequest'
   *
   *     responses:
   *       200:
   *         description: Successful request
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/exampleResponse'
   *       400:
   *         $ref: '#/components/missingOptional'
   *       404:
   *         $ref: '#/components/notFound'
   *       500:
   *         $ref: '#/components/internalServerError'
   */
  static async updateExample (req, res) {
    try {
      const { id } = req.params

      const { name, description } = req.body
      const error = missingOptional({ name, description })
      if (error) return res.status(error.code).json(error)

      const data = { name, description }
      const result = await ExampleService.updateExample(id, data)
      if (result.code === 404) return res.status(result.code).json(result)

      res.json(result)
    } catch (error) {
      internalServerError(error, req, res)
    }
  }

  /**
   * @swagger
   * /examples/{id}:
   *   delete:
   *     tags: [/examples]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: string
   *           format: uuid
   *
   *     responses:
   *       204:
   *         $ref: '#/components/noContent'
   *       404:
   *         $ref: '#/components/notFound'
   *       500:
   *         $ref: '#/components/internalServerError'
   */
  static async deleteExample (req, res) {
    try {
      const { id } = req.params

      const result = await ExampleService.deleteExample(id)
      if (result.code === 404) return res.status(result.code).json(result)

      res.status(NO_CONTENT.code).end()
    } catch (error) {
      internalServerError(error, req, res)
    }
  }
}

module.exports = ExampleController
