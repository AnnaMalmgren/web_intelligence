'use strict'
const kMeans = require('../models/algorithms/k-means')
const { formatKMeansCentroids } = require('../lib/formatHelper')
const { getWordCount, getBlogs } = require('../models/DAL/query')
const kMeansController = {}

kMeansController.getkMeans = async (req, res, next) => {
  try {
    const blogs = await getBlogs()
    const n = await getWordCount()
    const k = Number(req.query.clusters) || process.env.K
    const maxIterations = Number(req.query.iterations) || process.env.MAX_ITERATIONS

    const clusters = await kMeans(k, maxIterations, blogs, n)
    const response = formatKMeansCentroids(clusters)

    res.status(200).json(response)
  } catch (err) {
    next(err)
  }
}

module.exports = kMeansController
