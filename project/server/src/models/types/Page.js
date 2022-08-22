'use strict'

class Page {
  url
  words
  pageRank
  links

  constructor(url, words, links) {
    this.url = url
    this.words = words
    this.pageRank = 1.0
    this.links = links
  }

  /**
   * @param {Page} page the page to check if this instance has link to
   * @returns {Boolean}
   */
  hasLinkTo = page => this.links.has(page.url)

  /**
   * @returns {Number} number of links the page has.
   */
  getNoLinks = () => this.links.size
}

module.exports = Page
