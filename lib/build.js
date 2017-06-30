'use strict'

const log = require('./logger'),
      freshen = require('./freshenUp'),
      version = require('./versionUp'),
      clone = require('./clone'),
      clean = require('./clean'),
      zip = require('./zip'),
      remove = require('./remove'),
      sequential = require('promise-sequential')

/**
 * Builds the PowerSchool zip file
 * @param  {object} program The program object received from Commander
 */
module.exports = program => {

  const logger = log(program.quiet),
        promises = [
          freshen,
          version,
          clone,
          clean,
          zip,
          remove
        ]

  logger.info(`Starting zip of ${program.source}`)

  sequential(promises.map(promise => {
    return (previousResponse, responses, count) => {
      return promise(logger, program)
    }
  }))
  .then(() => {
    logger.info('Build complete!')
  })
  .catch(err => {
    logger.error(err)
  })

}
