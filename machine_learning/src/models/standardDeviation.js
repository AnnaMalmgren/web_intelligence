'use strict'
const { mean } = require('lodash')
const standardDeviation = col => {
  const m = mean(col)
  const N = col.length
  return Math.sqrt(col.reduce((sum, value) => sum + (value - m) ** 2, 0) / (N - 1))
}

module.exports = { standardDeviation }
