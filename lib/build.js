'use strict'

const log = require('./logger')
const freshen = require('./freshenUp')
const version = require('./versionUp')
const clone = require('./clone')
const clean = require('./clean')
const zip = require('./zip')
const remove = require('./remove')
const sequential = require('promise-sequential')

/**
 * Builds the PowerSchool zip file
 * @param  {object} program The program object received from Commander
 */
module.exports = program => {

  const logger = log(program.quiet)
  const promises = [
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
