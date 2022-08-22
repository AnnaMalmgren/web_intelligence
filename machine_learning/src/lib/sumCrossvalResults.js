'use strict'
const { accuracyScore } = require('../models/accuracyScore')

/**
 * Creates table data for accuracies from cross validations.
 * @param {[{preds: [], y: []}]} predictions
 * @returns { { accuracy: [], preds: [], labels: [] } } formatted accuracies
 */
const sumCrossvalResults = predictions =>
  predictions.reduce(
    (acc, cur) => ({
      accuracy: [...acc.accuracy, parseFloat((accuracyScore(cur.preds, cur.y) * 100).toFixed(2))],
      preds: [...acc.preds, ...cur.preds],
      labels: [...acc.labels, ...cur.y],
    }),
    { accuracy: [], preds: [], labels: [] }
  )

module.exports = { sumCrossvalResults }
