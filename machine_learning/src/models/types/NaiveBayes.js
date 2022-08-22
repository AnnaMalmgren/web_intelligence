'use strict'
const { zip, mean, sum } = require('lodash')
const { standardDeviation } = require('../standardDeviation')
const { chunk } = require('../../lib/chunk')
const ConfusionMatrix = require('./ConfusionMatrix')

class NaiveBayes {
  summaries

  constructor() {
    this.summaries = []
  }

  /**
   * @param {[[Number]]} X data to train
   * @param {[Number]} y categories
   */
  fit = (X, y) => {
    this.summaries = this.train(X, y)
  }

  /**
   * @param {[[Number]]} X data to test
   * @returns {[Nuber]} return predictions for given test data
   */
  predict = X => X.map(row => this.doPredict(row))

  confusion_matrix = (preds, y) => {
    const matrix = new ConfusionMatrix(y)
    preds.map((pred, index) => matrix.addPredToMatrix(pred, y[index]))
    return matrix
  }

  /**
   *
   * @param {[[Number]]} X data to train and test
   * @param {[Number]} y categories
   * @param {Number} folds number of buckets to use
   */
  crossval_predict = (X, y, folds) => {
    const xBuckets = chunk(X, folds)
    const yBuckets = chunk(y, folds)
    const predictions = []

    for (let i = 0; i < folds; i++) {
      const trainingX = xBuckets.flatMap(x => (x === xBuckets[i] ? [] : [...x]))
      const trainingY = yBuckets.flatMap(y => (y === yBuckets[i] ? [] : [...y]))

      this.fit(trainingX, trainingY)

      predictions.push({ preds: this.predict(xBuckets[i]), y: yBuckets[i] })
    }

    return predictions
  }

  /**
   * @param {[[Number]]} X data to train
   * @param {[Number]} y labels
   * @returns {[Object]} return array of objects containing mean and stdDev
   */
  train = (X, y) => {
    let categorized = this.categorize(X, y)
    return this.summarizeByClass(categorized)
  }

  /**
   * @param {[Number]} row row to predict label for.
   * @returns {Number} predicted category
   */
  doPredict = row => {
    let predictions = this.summaries.map(data =>
      Math.exp(row.reduce((sum, x, index) => sum + Math.log(this.pdf(x, data[index])), 0))
    )
    predictions = this.normalize(predictions)
    return predictions.indexOf(Math.max(...predictions))
  }

  /**
   * @param {[[Number]]} data data to be categorized
   * @param {[Number]} categories categories
   * @returns {Object} object containing categories and their data
   */
  categorize = (data, categories) =>
    data.reduce(
      (acc, row, i) => ({
        ...acc,
        [categories[i]]: acc[categories[i]] ? [...acc[categories[i]], row] : [row],
      }),
      {}
    )

  /**
   * @param {Object} data  the categorized data to be summarized
   * @returns {[Object]} return array of objects containing mean and stdDev
   */
  summarizeByClass = data => {
    const toSum = Object.values(data)
    let summarized = []

    for (let i = 0; i < toSum.length; i++) {
      const col = zip(...toSum[i])
      summarized = [...summarized, this.summarizeAttributes(col)]
    }

    return summarized
  }

  /**
   * @param {[[Number]]} data columns to summarize
   * @returns {[Object]} return array of objects containing mean and stdDev
   */
  summarizeAttributes = data =>
    data.map(value => ({ mean: mean(value), stdDev: standardDeviation(value) }))

  /**
   * Gaussian Probability Density Function
   * calculates probability of an input attribute
   * @param {Number} x attribute from test data
   * @param {{mean: Number, stdDev: Number}}
   */
  pdf = (x, { mean, stdDev }) =>
    (1 / (Math.sqrt(2 * Math.PI) * stdDev)) * Math.E ** (-((x - mean) ** 2) / (2 * stdDev ** 2))

  /**
   * @param {[Number]} data calculated probabilities to be normalized
   * @returns {[Number]} normalized probabilities
   */
  normalize = data => {
    const totSum = sum(data)
    return data.map(x => x / totSum)
  }
}
module.exports = NaiveBayes
