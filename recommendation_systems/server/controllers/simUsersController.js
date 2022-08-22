'use strict'

const simUsersController = {}

const getSimilarUsers = require('../models/similarUsers')
const euclidean = require('../models/similarityMetrics/euclidean')
const pearson = require('../models/similarityMetrics/pearson')

simUsersController.getEuclidean = async (req, res, next) => {
  try {
    const similarUsers = await getSimilarUsers(req.id, euclidean)
    const topResult = similarUsers.slice(0, req.results)

    return res.status(200).json({ recommendations: topResult })
  } catch (err) {
    next(err)
  }
}

simUsersController.getPearson = async (req, res, next) => {
  try {
    const similarUsers = await getSimilarUsers(req.id, pearson)
    const topResult = similarUsers.slice(0, req.results)

    return res.status(200).json({ recommendations: topResult })
  } catch (err) {
    next(err)
  }
}

module.exports = simUsersController
