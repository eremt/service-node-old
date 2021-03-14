const {
  NO_CONTENT,
  missingRequired,
  internalServerError,
} = require('../utils/responses')

/**
 * @swagger
 * components:
 *   one:
 *     type: object
 *     properties:
 *       one:
 *         type: string
 *   two:
 *     type: object
 *     properties:
 *       two:
 *         type: string
 *
 *   reqBody:
 *     allOf:
 *       - $ref: '#/components/one'
 *       - $ref: '#/components/two'
 */
class ExampleController {
  /**
   * @swagger
   * /example:
   *   get:
   *     tags: [/example]
   *
   *     responses:
   *       200:
   *         description: Successful request
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: GET /example
   *       500:
   *         $ref: '#/components/internalServerError'
   */
  static async get (req, res) {
    try {
      res.json({ message: 'GET /example' })
    } catch (error) {
      internalServerError(error, req, res)
    }
  }

  /**
   * @swagger
   * /example:
   *   post:
   *     tags: [/example]
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/reqBody'
   *
   *     responses:
   *       200:
   *         description: Successful request
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: POST /example
   *       400:
   *         $ref: '#/components/missingRequired'
   *       500:
   *         $ref: '#/components/internalServerError'
   */
  static async post (req, res) {
    try {
      const { one, two } = req.body
      const error = missingRequired({ one, two })
      if (error) return res.status(error.code).json(error)

      res.json({ message: 'POST /example' })
    } catch (error) {
      internalServerError(error, req, res)
    }
  }

  /**
   * @swagger
   * /example:
   *   put:
   *     tags: [/example]
   *     requestBody:
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/reqBody'
   *
   *     responses:
   *       200:
   *         description: Successful request
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: PUT /example
   *       400:
   *         $ref: '#/components/missingRequired'
   *       500:
   *         $ref: '#/components/internalServerError'
   */
  static async put (req, res) {
    try {
      const { one, two } = req.body
      const error = missingRequired({ one, two })
      if (error) return res.status(error.code).json(error)

      res.json({ message: 'PUT /example' })
    } catch (error) {
      internalServerError(error, req, res)
    }
  }

  /**
   * @swagger
   * /example:
   *   delete:
   *     tags: [/example]
   *
   *     responses:
   *       204:
   *         $ref: '#/components/noContent'
   *       500:
   *         $ref: '#/components/internalServerError'
   */
  static async delete (req, res) {
    try {
      res.status(NO_CONTENT.code).end()
    } catch (error) {
      internalServerError(error, req, res)
    }
  }
}

module.exports = ExampleController
