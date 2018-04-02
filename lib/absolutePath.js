'use strict'

const normalize = require('normalize-path')
const p = require('path')

module.exports = (value) => {
  return normalize(p.isAbsolute(value) ? value : p.join(process.cwd(), value))
}
