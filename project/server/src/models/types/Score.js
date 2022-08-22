'use strict'

class Score {
  content
  location
  score

  /**
   * @param {Number} content field for frequency score
   * @param {Number} location field for document location score
   */
  constructor(content, location) {
    this.content = content
    this.location = location
    this.score = 0


  }
}

module.exports = Score
