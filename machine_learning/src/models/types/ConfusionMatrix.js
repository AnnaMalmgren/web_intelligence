'use strict'

class ConfusionMatrix {
  matrix
  labels
  correct

  constructor(y) {
    this.labels = [...new Set(y)]
    this.matrix = this.createMatrix()
    this.correct = 0
  }

  /**
   * @returns {[[]]} matrix
   */
  getMatrix = () => this.matrix

  /**
   * Creates matrices rows and columns
   */
  createMatrix = () => this.labels.map(() => new Array(this.labels.length).fill(0))

  /**
   * sets value in matrix
   * @param {Number} pred predicted label
   * @param {Number} label actual label
   */
  addPredToMatrix = (pred, label) => {
    if (label === pred) this.correct++
    this.matrix[label][pred]++
  }
}

module.exports = ConfusionMatrix
