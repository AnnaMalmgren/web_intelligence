'use strict'

const recMoviesController = {}

const getRecommendedMovies = require('../models/recommendedMovies')
const pearson = require('../models/similarityMetrics/pearson')
const euclidean = require('../models/similarityMetrics/euclidean')
const getSimilarMovies = require('../models/itemBasedMovies')

recMoviesController.getPearson = async (req, res, next) => {
  try {
    const recMovies = await getRecommendedMovies(req.id, pearson)
    const topResult = recMovies.slice(0, req.results)

    return res.send(JSON.stringify({ recommendations: topResult }))
  } catch (err) {
    next(err)
  }
}

recMoviesController.getEuclidean = async (req, res, next) => {
  try {
    const recMovies = await getRecommendedMovies(req.id, euclidean)
    const topResult = recMovies.slice(0, req.results)

    return res.status(200).json({ recommendations: topResult })
  } catch (err) {
    next(err)
  }
}

recMoviesController.getItemBased = async (req, res, next) => {
  try {
    const movies = await getSimilarMovies(req.id)
    const topResult = movies.slice(0, req.results)

    return res.status(200).json({ recommendations: topResult })
  } catch (err) {
    next(err)
  }
}

module.exports = recMoviesController
