'use strict'

/**
 * @param {Number[]} words the indexed words to calculate frequency of
 * @param {Number[]} query the indexed query string words
 * @returns {Number} word frequency score for a page
 */
const getWordFrequency = (words, query) => {
  return words.reduce((score, word) => {

    if (query.includes(word)) {
      score++
    }
    return score
  }, 0)
}

module.exports = getWordFrequency
