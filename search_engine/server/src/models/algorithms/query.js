'use strict'

const getWordToId = require('../wordToId')
const { normalize } = require('./normalization')
const getWordFrequency = require('../metrics/wordFrequency')
const docLocation = require('../metrics/location')
const Score = require('../types/Score')
const Formatter = require('../types/Formatter')

/**
 *
 * @param {String} query the search query string
 * @param {Page[]} pagesDb the indexed pages
 * @returns {Promise<Object[]>} sorted array with result objects
 */
const query = async (qws, pagesDb) => {
  const query = qws.split(/\s+/g).map(getWordToId)
  const result = []

  return new Promise((resolve, reject) => {
    let done = false

    let scores = pagesDb.map(page => {
      return new Score(getWordFrequency(page.words, query), docLocation(page.words, query))
    })

    scores = normalize(scores)

    scores.map((score, index) => {
      if (score.content > 0) {
        const formatter = new Formatter(score, pagesDb[index])
        result.push(formatter.getScores())
      }
    })

    result.sort((a, b) => b.scores.score - a.scores.score)
    done = true

    done ? resolve(result) : reject('something went wrong in query')
  })
}

module.exports = query
