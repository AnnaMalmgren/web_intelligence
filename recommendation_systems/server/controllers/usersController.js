'use strict'

const { getAllUsers } = require('../models/DAL/queries')
const usersController = {}


usersController.getUsers = async (req, res, next) => {
  try {
    const users = await getAllUsers()
    res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}

module.exports = usersController
