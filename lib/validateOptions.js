module.exports = program => {
  if (
    typeof program.increment === 'string' &&
    !program.increment.match(/^(major|minor|patch)$/i)
  ) {
    throw new Error('The increment value must be major, minor, or path.')
  }
}
