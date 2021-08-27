'use strict'

const fs = require('fs-extra')
const p = require('path')
const xml = require('xml2js')
const semver = require('semver')
const fail = require('./fail')
const parser = new xml.Parser()
const builder = new xml.Builder()

/**
 * Increments the plugin version using semver
 *
 * @param {object} logger A logging helper to log progress and errors
 * @param {object} program The Commander object
 */
module.exports = async (logger, program) => {
  if (!program.increment) {
    logger.info(`Version is not incrementing`)
    return
  }

  if (program.increment === true) {
    program.increment = 'patch'
  }

  let nextVersion = null
  let xmlObject = {}

  try {
    const pluginXmlPath = p.join(program.source, 'plugin.xml')
    const data = await fs.readFile(pluginXmlPath, 'utf8')

    // Read the xml and get the updated semver based on the increment value
    xmlObject = await parser.parseStringPromise(data)
  } catch (err) {
    logger.error(`Failed incrementing the ${program.increment} version of the plugin: ${err.message}`)
    fail()
  }

  nextVersion = semver.inc(xmlObject.plugin.$.version, program.increment)
  xmlObject.plugin.$.version = nextVersion

  // Rewrite the xml
  try {
    await fs.writeFile(pluginXmlPath, builder.buildObject(xmlObject))
  } catch (err) {
    logger.error(`Error writing plugin.xml with version ${nextVersion}:`, err)
    fail()
  }

  logger.info(`Saved plugin.xml with plugin version ${nextVersion}`)
}
