'use strict'
const { mean } = require('lodash')

class ResultPresenter {
  X
  y
  constructor(X, y) {
    this.X = X
    this.y = y
  }

  printFileInformation = (filename, attributes, categories) => {
    console.log(`\n**** File: ${filename} ****\n`)
    console.log(`Number of examples: ${this.X.length}`)
    console.log(`Number of attributes: ${attributes.length}`)
    console.log(`Number of classes: ${categories.size}\n`)
    console.log(`Labels: `, categories, `\n`)
  }

  printMatrixAndAccuracy = (score, matrix) => {
    console.log(
      `\nAccuracy score: ${(score * 100).toFixed(2)} % (${matrix.correct}/${
        this.X.length
      } correctly classified)\n`
    )
    console.log(`\nConfusion Matrix:`)
    console.table(matrix.getMatrix())
  }

  printCrossval = () => console.log(`\n**** Cross validation **** \n`)

  printCrossvalResults = (folds, crossvalAccuracy, matrix) => {
    console.log(`\nAccuracy by fold (${folds}) :`)
    console.table({ 'accuracy %': crossvalAccuracy })
    console.log(`\nTotal accuracy score: ${mean(crossvalAccuracy).toFixed(2)} %`)
    console.log(`(${matrix.correct}/${this.X.length}  correctly classified)\n`)
    console.log(`\nConfusion Matrix:`)
    console.table(matrix.getMatrix())

    console.log(`\n**********************************************\n`)
  }
}

module.exports = ResultPresenter
