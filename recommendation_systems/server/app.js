'use strict'

const helmet = require('helmet')
const cors = require('cors')
const express = require('express')
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(helmet())
app.use(cors())

app.use('/similar-users', require('./routes/simUsersRouter'))
app.use('/recommended-movies', require('./routes/recMoviesRouter'))
app.use('/users', require('./routes/usersRouter'))

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message })
})

app.listen(process.env.PORT || 8080, () => {
  console.log('Server running at port ' + process.env.PORT)
})

module.exports = app
