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

app.use('/k-means', require('./routes/kMeansRouter'))
app.use('/hierarchy', require('./routes/hierarchyRouter'))

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
