'use strict'
let id = 0
let words = new Map()

/**
 * @param {String} word word to get id of.
 * @returns {Number} id for the word
 */
const getWordToId = word => {
  if (!words.has(word)) words.set(word, id++)
  return words.get(word)
}

module.exports = getWordToId
