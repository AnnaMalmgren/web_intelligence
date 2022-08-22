'use strict'

class Cluster {
  left
  right
  blog
  distance

  constructor(blog) {
    this.blog = blog
    this.left = null
    this.right = null
    this.distance = 0
  }
}

module.exports = Cluster
