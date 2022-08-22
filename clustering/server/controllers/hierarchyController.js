'use strict'
const hierarchy = require('../models/algorithms/hierarchy')
const NodeCache = require('node-cache')
const myCache = new NodeCache()
const { formatHierarchyClusters } = require('../lib/formatHelper')
const { getWordCount, getBlogs } = require('../models/DAL/query')
const hierarchyController = {}

hierarchyController.getHierarchy = async (req, res, next) => {
  try {
    if (myCache.has('hierarchy')) {
      return res.status(200).json(myCache.get('hierarchy'))
    }

    const blogs = await getBlogs()
    const n = await getWordCount()
    const clusters = await hierarchy(blogs, n)
    const response = formatHierarchyClusters(clusters)
    myCache.set('hierarchy', response)
    res.status(200).json(response)
  } catch (err) {
    next(err)
  }
}

module.exports = hierarchyController
