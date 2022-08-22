'use strict'
let id = 0
let words = new Map()

const getWordToId = word => {
  if (!words.has(word)) words.set(word, id++)
  return words.get(word)
}

module.exports = getWordToId
