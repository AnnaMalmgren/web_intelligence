'use strict'

/**
 *
 * @param {[Number]} preds predicted categories
 * @param {[Number]} y actual categories
 * @returns {Number} accuracy score
 */
const accuracyScore = (preds, y) =>
  preds.reduce((score, pred, i) => (score += pred === y[i] ? 1 : 0), 0) / y.length

module.exports = { accuracyScore }
