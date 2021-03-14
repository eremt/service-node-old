const { typeOf } = require('./')
const regexp = require('./regexp')

const blacklistRegexp = [
  regexp.email,
]
const blacklistKeys = [
  'password',
  'passwordRepeat',
  'newPassword',
  'newPasswordRepeat',
]

const REDACTED = '*REDACTED*'

// TODO: replace matched substring instead of entire string
function redactString (input) {
  let result = input
  for (const re of blacklistRegexp) {
    if (re.test(input)) {
      result = REDACTED
    }
  }
  return result
}

function redactObject (input) {
  const result = {}
  for (const key in input) {
    const t = typeOf(input[key])
    if (t === 'object' || t === 'array') {
      result[key] = redact(input[key])
      continue
    }

    if (blacklistKeys.includes(key)) {
      result[key] = REDACTED
      continue
    }

    result[key] = redact(input[key])
  }
  return result
}

function redactArray (input) {
  const result = []
  for (const key in input) {
    result.push(redact(input[key]))
  }
  return result
}

function redact (data) {
  const type = typeOf(data)
  let redacted

  switch (type) {
    case 'object':
      redacted = redactObject(data)
      break

    case 'array':
      redacted = redactArray(data)
      break

    case 'string':
      redacted = redactString(data)
      break

    default:
      redacted = data
  }

  return redacted
}

function log (...args) {
  console.log(...args)
}

function logRequests (options) {
  return function (req, res, next) {
    log(new Date())
    let { method, url } = req
    method = method.toUpperCase()
    log(`${method} ${url}`)

    if (Object.keys(req.cookies).length) {
      log('Cookies:')
      log(JSON.stringify(req.cookies, null, 2))
    }
    if (Object.keys(req.body).length) {
      log('Body:')
      const body = redact(req.body)
      log(JSON.stringify(body, null, 2))
    }

    next()
  }
}

module.exports = {
  log,
  logRequests,
}
