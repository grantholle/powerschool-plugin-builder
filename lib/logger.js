'use strict'

const winston = require('winston')

winston.cli()

module.exports = (quiet = false) => {

  return {
    info: message => {
      if (!quiet) {
        winston.info(message)
      }
    },
    error: winston.error
  }
}
