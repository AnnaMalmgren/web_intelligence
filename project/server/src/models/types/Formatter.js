'use strict'

class Formatter {
  score
  url
  pageRank

  /**
   * @param {Score} score
   * @param {String} url
   * @param {Number} pageRank
   */
  constructor(score, page) {
    this.score = score
    this.url = page.url
    this.pageRank = page.pageRank
  }

  /**
   * @returns {Object} containing page: url, scores: score, content,
   *  location and pageRank
   */
  getScores = () => {
    return {
      page: this.url,
      scores: {
        score: this.score.content + 0.8 * this.score.location + this.pageRank * 0.5,
        content: this.score.content,
        location: 0.8 * this.score.location,
        pageRank: this.pageRank * 0.5,
      },
    }
  }
}

module.exports = Formatter
