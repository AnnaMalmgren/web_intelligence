'use strict'

/**
 * @param {Object} blogA blog to calculate distance
 * @param {Object} blogB blog to calculate distance
 * @param {Number} n number of words
 */
const pearson = (blogA, blogB, n) => {
  let sumA = 0
  let sumB = 0
  let sumAsq = 0
  let sumBsq = 0
  let pSum = 0

  for (let i = 0; i < n; i++) {
    sumA += blogA.wordCounts[i]
    sumB += blogB.wordCounts[i]
    sumAsq += blogA.wordCounts[i] ** 2
    sumBsq += blogB.wordCounts[i] ** 2
    pSum += blogA.wordCounts[i] * blogB.wordCounts[i]
  }

  const num = pSum - (sumA * sumB) / n
  const den = Math.sqrt((sumAsq - sumA ** 2 / n) * (sumBsq - sumB ** 2 / n))

  return 1.0 - num / den
}

module.exports = pearson
