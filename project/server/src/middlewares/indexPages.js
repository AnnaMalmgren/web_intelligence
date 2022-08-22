'use strict'

/**
 * Sets cached pages to res object.
 * @param {NodeChache} myCache
 */
const indexPages = myCache => {
  return async (req, res, next) => {
    res.pages = await myCache.get('pages')
    next()
  }
}

module.exports = indexPages
