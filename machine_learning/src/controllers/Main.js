'use strict'
const { FOLDS } = require('../constants')
const NaiveBayes = require('../models/types/NaiveBayes')
const ResultPresenter = require('../views/ResultPresenter')
const { accuracyScore } = require('../models/accuracyScore')
const { sumCrossvalResults } = require('../lib/sumCrossvalResults')
const DataSet = require('../models/types/DataSet')

class Main {
  folds
  view
  naiveBayes
  dataset

  constructor(file, folds) {
    this.dataset = new DataSet(file)
    this.setFolds(folds)
    this.naiveBayes = null
    this.view = null
  }

  setFolds = folds => {
    if (!FOLDS.includes(folds)) {
      console.error('\nIncorrect fold number, folds i set to default (5)\n')
      this.folds = 5
    } else {
      this.folds = folds
    }
  }

  run = async () => {
    const { X, y } = await this.dataset.getFileData()

    this.view = new ResultPresenter(X, y)
    this.naiveBayes = new NaiveBayes()

    this.runNaiveBayes(X, y)
    this.runCrossValidation(X, y)
  }

  runNaiveBayes = (X, y) => {
    this.view.printFileInformation(
      this.dataset.filename,
      this.dataset.attributes,
      this.dataset.categories
    )

    console.time(`Training time`)
    this.naiveBayes.fit(X, y)
    console.timeEnd(`Training time`)

    console.time(`Evaluation time`)
    const preds = this.naiveBayes.predict(X)
    const score = accuracyScore(preds, y)
    console.timeEnd(`Evaluation time`)

    const matrix = this.naiveBayes.confusion_matrix(preds, y)
    this.view.printMatrixAndAccuracy(score, matrix)
  }

  runCrossValidation = (X, y) => {
    this.view.printCrossval()

    console.time(`Cross validations evaluation time`)
    const predictions = this.naiveBayes.crossval_predict(X, y, this.folds)
    console.timeEnd(`Cross validations evaluation time`)

    const { preds, labels, accuracy } = sumCrossvalResults(predictions)

    const matrix = this.naiveBayes.confusion_matrix(preds, labels)

    this.view.printCrossvalResults(this.folds, accuracy, matrix)
  }
}

module.exports = Main
