'use strict'
const { readFile } = require('../../lib/readData')
const { tail, last, initial, first } = require('lodash')

class DataSet {
  filename
  data
  attributes
  categories
  index

  constructor(file) {
    this.filename = file
    this.data = this.attributes = []
    this.categories = new Map()
    this.index = 0
  }

  /**
   * @param {String} category category to get id for
   * @returns {Number} the id
   */
  getCategoryId = category => {
    if (!this.categories.has(category)) this.categories.set(category, this.index++)
    return this.categories.get(category)
  }

  /**
   * reads filedata and creates and object containing X and y
   * @returns {Promise<{X: [], y: []}>}
   */
  getFileData = async () => {
    const fileData = await readFile(`.\\data-sets\\${this.filename}`)
    this.attributes = initial(first(fileData)) //get first row, leave out last
    const rows = tail(fileData) // don't include the row with attribute names.

    this.data = rows.reduce(
      (acc, row) => {
        return {
          ...acc,
          X: [...acc.X, initial(row).map(Number)],
          y: [...acc.y, this.getCategoryId(last(row))],
        }
      },
      { X: [], y: [] }
    )

    return this.data
  }
}
module.exports = DataSet
