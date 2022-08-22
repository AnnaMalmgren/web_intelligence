'use strict'

/**
 * @param {Score[]} scores
 * @returns {Score[]} scores containing normalized values
 */
const normalize = scores => {
  const range = scores.reduce(
    (range, score) => {
      return {
        max: Math.max(score.content, range.max),
        min: Math.min(score.location, range.min),
      }
    },
    { min: Infinity, max: -Infinity }
  )

  return scores.map(score => {
    return {
      ...score,
      content: score.content / Math.max(range.max, 0.00001),
      location: Math.max(range.min, 0.00001) / score.location,
    }
  })
}

module.exports = {
  normalize,
}
