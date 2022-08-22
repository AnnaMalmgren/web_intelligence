'use strict'
const express = require('express')
const router = express.Router()
const controller = require('../controllers/kMeansController.js')

router.get('/', controller.getkMeans)

module.exports = router
