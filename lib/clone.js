'use strict'

const fs = require('fs-extra')
const p = require('path')
const fail = require('./fail')

/**
 * Copies the source to a new temporary directory
 *
 * @param {object} logger A logging helper to log progress and errors
 * @param {object} program The Commander object
 */
module.exports = async (logger, program) => {
  try {
    await fs.copy(program.source, program.tempSource, {
      filter: (source, dest) => {
        const base = p.basename(source)

        return !(base === 'node_modules' || base === '.git')
      }
    })
  } catch (err) {
    logger.error(`Copy source directory to temporary directory ${program.tempSource} failed:`, err)
    fail()
  }

  logger.info(`Copied source directory to temporary directory ${program.tempSource}`)
}
