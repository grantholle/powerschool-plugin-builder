'use strict'

const fs = require('fs-extra')
const fail = require('./fail')

/**
 * Removes the temporary source directory
 *
 * @param {object} logger A logging helper to log progress and errors
 * @param {object} program The Commander object
 */
module.exports = async (logger, program) => {
  try {
    await fs.remove(program.tempSource)
    logger.info(`Removed temporary directory ${program.tempSource}`)
  } catch (err) {
    winston.error(`Error deleting ${program.tempSource}:`, err)
    fail()
  }
}
