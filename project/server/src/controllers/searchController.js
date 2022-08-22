'use strict'
const query = require('../models/algorithms/query')
const searchController = {}

searchController.getSearch = async (req, res, next) => {
  try {
    const start = Date.now()
    const qws = req.query.search.toLowerCase()
    const pages = res.pages

    const result = await query(qws, pages)
    const topPages = result.slice(0, 5)


    const stop = Date.now()
    const time = (stop - start) / 1000

    res.status(200).json({ result: topPages, number: result.length, time: time })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

module.exports = searchController
