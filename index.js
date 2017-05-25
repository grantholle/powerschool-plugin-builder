#! /usr/bin/env node
'use strict'

const program = require('commander'),
      exec = require('child_process').exec,
      fs = require('fs-extra'),
      p = require('path'),
      normalize = require('normalize-path'),
      archive = require('archiver')('zip'),
      each = require('async').each,
      winston = require('winston'),
      untildify = require('untildify'),
      allowedItems = [
        'plugin.xml',
        'messagekeys',
        'user_schema_root',
        'web_root',
        'queries_root',
        'permissions_root'
      ],
      expand = (val) => {
        return untildify(val)
      }

winston.cli()

program.version(require('./package.json').version)
  .option('-s, --source [path]', 'The path to the plugin directory. If none is given, assumes your current working directory.')
  .option('-o, --output [path]', 'The path to the output directory. If none is given, assumes your current working directory.')
  .option('-q, --quiet', 'Do not log messages')
  .parse(process.argv)

if (!program.source) {
  program.source = process.cwd()
}

if (!program.output) {
  program.output = process.cwd()
}

const source = normalize(p.isAbsolute(program.source) ? program.source : p.join(process.cwd(), program.source)),
      tempSource = normalize(p.join(__dirname, 'temp-build')),
      outputPath = p.join(p.isAbsolute(program.output) ? program.output : p.join(process.cwd(), program.output), p.basename(source) + '.zip'),

      log = msg => {
        if (!program.quiet) {
          winston.info(msg)
        }
      },

      // The magic
      buildItYo = () => {
        // 2. Copy to temp directory
        fs.copy(source, tempSource, err => {
          if (err)
            return winston.error('Error copying source directory:', err)

          log('Copied source directory to temporary directory')

          // 3. Read the temp directory and only add allowed files
          fs.readdir(tempSource, (err, files) => {
            if (err)
              return winston.error('Error reading source directory:', err)

            each(files, (file, cb) => {
              if (allowedItems.indexOf(file.toLowerCase()) === -1) {
                fs.remove(p.join(tempSource, file), err => {
                  if (err)
                    return cb(`Error deleting ${file}:`, err)

                  log(`Cleaned ${file} from temporary directory`)
                  cb()
                })
              } else {
                cb()
              }
            }, err => {
              if (err)
                return winston.error(err)

              log('Finished sanitizing temporary directory')

              // 4. Pipe to output
              archive.pipe(output)
              archive.directory(tempSource, false).finalize()
            })
          })
        })
      }

let output

log(`Starting zip of ${source}`)

// 1. Remove the previous build if it exists
fs.remove(outputPath, () => {
  log('Removed old zip file')

  output = fs.createWriteStream(outputPath)

  output.on('close', () => {
    log(`Zip file created at ${outputPath}`)

    // 5. Delete the temp directory
    fs.remove(tempSource, err => {
      if (err)
        return winston.error(`Error deleting ${tempSource}:`, err)

      log('Removed temporary directory')
      log('Build finished!')
    })
  })

  output.on('error', err => {
    winston.error('Failed creating zip file:', err)
  })

  // Build it on next tick
  process.nextTick(buildItYo)
})

archive.on('entry', file => {
  log(`Added entry ${file.name}`)
})
