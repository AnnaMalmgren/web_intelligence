'use strict'

/**
 * @param {[]} toChunk the array to be chunked
 * @param {Number} n number of chunks
 * @returns {[[]]} array containing the chunks
 */
const chunk = (toChunk, n) => {
  toChunk = toChunk.slice()
  let result = []
  while (toChunk.length) {
    result.push(toChunk.splice(0, Math.ceil(toChunk.length / n--)))
  }
  return result
}

module.exports = { chunk }
