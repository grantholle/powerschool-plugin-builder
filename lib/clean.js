'use strict'

const fs = require('fs-extra')
const p = require('path')
const fail = require('./fail')

/**
 * Removes files and directories that PowerSchool will not accept in a plugin zip file
 *
 * @param {object} logger A logging helper to log progress and errors
 * @param {object} program The Commander object
 */
module.exports = async (logger, program) => {
  let files = []
  const allowedItems = [
    'plugin.xml',
    'messagekeys',
    'user_schema_root',
    'web_root',
    'queries_root',
    'permissions_root',
    'data_change_configuration_root',
    'pagecataloging',
  ]

  try {
    files = await fs.readdir(program.tempSource)
  } catch (err) {
    logger.error(`Error reading temporary source directory ${program.tempSource}:`, err)
    fail()
  }

  for (const file of files) {
    if (allowedItems.includes(file.toLowerCase())) {
      continue;
    }

    try {
      await fs.remove(p.join(program.tempSource, file))
    } catch (err) {
      logger.error(`Error deleting ${file}:`, err)
      fail()
    }

    logger.info(`Cleaned ${file} from temporary directory`)
  }

  logger.info('Finished sanitizing temporary directory')
}
