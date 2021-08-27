'use strict'

const fs = require('fs-extra')
const fail = require('./fail')

/**
 * Removes an existing built zip file
 *
 * @param {object} logger A logging helper to log progress and errors
 * @param {object} program The Commander object
 */
module.exports = async (logger, program) => {
  try {
    await fs.remove(program.zipPath)
    logger.info(`Removed existing build`)
  } catch (err) {
    logger.error(`Failed removing zip file located at ${program.zipPath}:`, err)
  }
}
