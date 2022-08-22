'use strict'
const fs = require('fs').promises
const NodeCache = require('node-cache')
const myCache = new NodeCache()

const storage = async () => {
  try {
    let data = await fs.readFile(process.env.FILE)
    data = await JSON.parse(data)
    myCache.set('data', data)
  } catch (e) {
    console.log(e.message)
  }
}

const getData = async () => {
  if (myCache.get('data') === undefined) {
    await storage()
  }
  return myCache.get('data')
}

module.exports.getData = getData
