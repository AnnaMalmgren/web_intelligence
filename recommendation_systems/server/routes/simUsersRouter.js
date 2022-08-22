'use strict'
const express = require('express')
const router = express.Router()
const controller = require('../controllers/simUsersController.js')
const getParams = require('../middleware/getParams')

router.get('/euclidean/:id', getParams, controller.getEuclidean)
router.get('/pearson/:id', getParams, controller.getPearson)

module.exports = router
