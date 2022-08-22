'use strict'
const express = require('express')
const router = express.Router()
const controller = require('../controllers/recMoviesController.js')
const getParams = require('../middleware/getParams')

router.get('/pearson/:id', getParams, controller.getPearson)
router.get('/euclidean/:id', getParams, controller.getEuclidean)
router.get('/itemBased/euclidean/:id', getParams, controller.getItemBased)
module.exports = router
