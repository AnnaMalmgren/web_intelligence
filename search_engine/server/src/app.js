'use strict'

const NodeCache = require('node-cache')
const myCache = new NodeCache()
const { getIndexedPages } = require('./models/DAL/pages')
const helmet = require('helmet')
const cors = require('cors')
const express = require('express')
const indexPages = require('./middlewares/indexPages')
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(helmet())
app.use(cors())

// create Pages objects of the files.
if (!myCache.has('pages')) {
  getIndexedPages().then(pages => myCache.set('pages', pages))
}

// middleware to fetch pages from cache
app.use(indexPages(myCache))

app.use('/search', require('./routes/searchRouter'))

app.use((req, res, next) => {
  res.status(404).json({ error: 'Not found' })
})

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message })
})

app.listen(process.env.PORT || 8000, () => {
  console.log('Server running at port ' + process.env.PORT || 8000)
})

module.exports = app
