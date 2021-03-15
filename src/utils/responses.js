const { log } = require('./logger')
/**
 * @swagger
 * components:
 *   noContent:
 *     description: Successful request
 */
const NO_CONTENT = {
  code: 204,
}

function missingParameters (_params, message, optional = false) {
  const params = Object.entries(_params)
  const missing = params.map(([key, value]) => {
    if (value === undefined) return key
    return undefined
  }).filter(_ => _)

  if (optional && missing.length !== params.length) return null

  if (!missing.length) return null
  return {
    code: 400,
    message: `${message}: ${missing.join(', ')}.`,
  }
}

// This function will return error if ALL params are undefined
/**
 * @swagger
 * components:
 *   missingOptional:
 *     description: Bad request
 *     content:
 *       application/json:
 *         schema:
 *           example:
 *             code: 400
 *             message: 'Missing optional parameter(s): [parameters].'
 */
function missingOptional (params) {
  return missingParameters(params, 'Missing optional parameter(s)', true)
}
// This function will return error if ANY params are undefined
/**
 * @swagger
 * components:
 *   missingRequired:
 *     description: Bad request
 *     content:
 *       application/json:
 *         schema:
 *           example:
 *             code: 400
 *             message: 'Missing required parameter(s): [parameters].'
 */
function missingRequired (params) {
  return missingParameters(params, 'Missing required parameter(s)')
}

const EMAIL_EXISTS = {
  code: 422,
  message: 'E-mail is already registered.',
}
const PASSWORDS_NO_MATCH = {
  code: 422,
  message: 'Passwords do not match.',
}

/**
 * @swagger
 * components:
 *   unauthorizedRequest:
 *     description: Unauthorized request
 *     content:
 *       application/json:
 *         schema:
 *           example:
 *             code: 401
 *             message: Unauthorized request.
 */
const UNAUTHORIZED_REQUEST = {
  code: 401,
  message: 'Unauthorized request.',
}

/**
 * @swagger
 * components:
 *   internalServerError:
 *     description: Internal server error
 *     content:
 *       application/json:
 *         schema:
 *           example:
 *             code: 500
 *             message: Internal server error.
 */
const INTERNAL_SERVER_ERROR = {
  code: 500,
  message: 'Internal server error.',
}
function internalServerError (req, res, error) {
  log(error.stack)
  res.status(INTERNAL_SERVER_ERROR.code).json(INTERNAL_SERVER_ERROR)
}

module.exports = {
  NO_CONTENT,
  EMAIL_EXISTS,
  PASSWORDS_NO_MATCH,
  UNAUTHORIZED_REQUEST,
  missingOptional,
  missingRequired,
  internalServerError,
}
