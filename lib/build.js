'use strict'

const p = require('path')
const normalize = require('normalize-path')
const log = require('./logger')
const freshen = require('./freshenUp')
const version = require('./versionUp')
const clone = require('./clone')
const clean = require('./clean')
const zip = require('./zip')
const remove = require('./remove')
const validateOptions = require('./validateOptions')

/**
 * Builds the PowerSchool zip file
 * @param  {object} program The program object received from Commander
 */
module.exports = async program => {
  const logger = log(program.quiet)
  const tasks = [
    freshen,
    version,
    clone,
    clean,
    zip,
    remove
  ]

  logger.info(`Starting zip of ${program.source}`)

  program.zipPath = p.join(program.output, p.basename(program.source) + '.zip')
  program.tempSource = normalize(p.join(program.build, '.temp-build'))

  try {
    validateOptions(program)

    for (const task of tasks) {
      await task(logger, program)
    }
  } catch (err) {
    logger.error(err.message)
    process.exit()
  }

  logger.info('Build complete!')
}
