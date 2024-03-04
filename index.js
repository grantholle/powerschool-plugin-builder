#! /usr/bin/env node
'use strict'

const program = require('commander')
const absolutePath = require('./lib/absolutePath')
const build = require('./lib/build')
const os = require('os')

program.version(require('./package.json').version)
  .option('-s, --source [path]', 'The path to the plugin directory. If none is given, assumes your current working directory.', absolutePath, process.cwd())
  .option('-o, --output [path]', 'The path to the output directory. If none is given, assumes your current working directory.', absolutePath, process.cwd())
  .option('-b, --build [path]', 'The path to the temporary build directory. If none is given, use your OS temp directory.', absolutePath, os.tmpdir())
  .option('-i, --increment [level]', 'Increment the version found `plugin.xml` by release type: major, minor, patch.')
  .option('-q, --quiet', 'Do not log messages')
  .parse(process.argv)

build(program)
