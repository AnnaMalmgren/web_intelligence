'use strict'
const express = require('express')
const router = express.Router()
const controller = require('../controllers/searchController.js')

router.get('/', controller.getSearch)

module.exports = router
