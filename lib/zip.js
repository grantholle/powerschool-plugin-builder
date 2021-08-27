'use strict'

const fs = require('fs-extra')
const fail = require('./fail')
const archiver = require('archiver')('zip')

/**
 * Compresses the temporary zip file
 *
 * @param {object} logger A logging helper to log progress and errors
 * @param {object} program The Commander object
 */
module.exports = (logger, program) => {
  return new Promise((resolve, reject) => {
    const output = fs.createWriteStream(program.zipPath)

    output.on('close', () => {
      logger.info(`Zip file created at ${program.zipPath}`)
      resolve()
    })

    output.on('error', err => {
      logger.error('Failed creating zip file:', err)
      fail()
    })

    archiver.on('entry', file => {
      logger.info(`Added entry ${file.name}`)
    })

    archiver.pipe(output)
    archiver.directory(program.tempSource, false)
    archiver.finalize()
  })
}
