'use strict'

const fs = require('fs-extra')
const p = require('path')
const each = require('async').each
const allowedItems = [
  'plugin.xml',
  'messagekeys',
  'user_schema_root',
  'web_root',
  'queries_root',
  'permissions_root'
]

/**
 * Removes files and directories that PowerSchool will not accept in a plugin zip file
 * @param  {object} logger  A logging helper to log progress and errors
 * @param  {object} program The object generated by Commander
 * @return {Promise}        An empty Promise
 */
module.exports = (logger, program) => {

  return new Promise((resolve, reject) => {
    fs.readdir(program.tempSource, (err, files) => {
      if (err) {
        logger.error('Error reading source directory:', err)
        return reject('Build failed!')
      }

      each(files, (file, cb) => {
        if (allowedItems.indexOf(file.toLowerCase()) === -1) {
          fs.remove(p.join(program.tempSource, file), err => {
            if (err) {
              logger.error(`Error deleting ${file}:`, err)
              return reject('Build failed!')
            }

            logger.info(`Cleaned ${file} from temporary directory`)
            cb()
          })
        } else {
          cb()
        }
      }, () => {
        logger.info('Finished sanitizing temporary directory')
        resolve()
      })
    })
  })

}
