'use strict'

/**
 * @param {Number[]} words the indexed words to calculate location of
 * @param {Number[]} query the indexed query string words
 * @returns {Number} document location score for a page
 */
const docLocation = (words, query) => {
  return query.reduce((score, qw) => {
    let index = words.indexOf(qw)
    return (score += index >= 0 ? index + 1 : 100000)
  }, 0)
}

module.exports = docLocation
