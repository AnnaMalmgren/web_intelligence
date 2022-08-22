'use strict'

const { MAX_ITERATIONS } = require('../../config/constants')

/**
 * @param {Page[]} pages the pages to calculate page rank on
 * @returns {Promise<Page[]>} the given pages with added page rank score
 */
const pageRank = async pages => {
  return new Promise((resolve, reject) => {
    let done = false

    for (let i = 0; i < MAX_ITERATIONS; i++) {
      const pageranks = []

      // set pageranks
      pages.map(page => pageranks.push(iteratePR(page, pages)))

      // add pagerank to pages
      pageranks.map((pr, index) => (pages[index].pageRank = pr))
    }

    //normalize
    const max = pages.reduce((max, page) => Math.max(page.pageRank, max), -Infinity)
    pages.forEach(page => (page.pageRank = page.pageRank / Math.max(max, 0.00001)))
    done = true

    done ? resolve(pages) : reject('something went wrong with page ranking')
  })
}

/**
 * @param {Page} page the page to calculate rank on
 * @param {Page[]} pages the indexed pages
 * @returns {Number} the cacluluate page rank for given page
 */
const iteratePR = (page, pages) => {
  let pr = pages.reduce((rank, current) => {
    if (current.hasLinkTo(page)) {
      rank += current.pageRank / current.getNoLinks()
    }
    return rank
  }, 0)

  return 0.85 * pr + 0.15
}

module.exports = pageRank
