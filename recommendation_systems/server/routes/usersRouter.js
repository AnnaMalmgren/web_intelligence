'use strict'
const express = require('express')
const router = express.Router()
const controller = require('../controllers/usersController.js')

router.get('/', controller.getUsers)

module.exports = router
