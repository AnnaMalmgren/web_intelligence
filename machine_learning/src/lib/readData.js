'use strict'

const fs = require('fs')
const parse = require('csv-parse')
const { isEmpty, filter } = require('lodash')

/**
 * @param {String} file path to file to read.
 */
const readFile = async file => {
  let fileData = await readCSV(file)
  return filter(fileData, data => !isEmpty(data))
}

/**
 * @param {String} file path to file to read.
 */
const readCSV = async file => {
  const data = []
  return new Promise((resolve, reject) => {
    fs.createReadStream(file)
      .pipe(parse({ delimiter: ',' }))
      .on('error', err => reject(err))
      .on('data', r => data.push(r))
      .on('end', () => resolve(data))
  })
}

module.exports = { readFile }
