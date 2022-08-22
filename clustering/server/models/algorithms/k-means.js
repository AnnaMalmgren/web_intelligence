'use strict'
const Centroid = require('../types/centroid')
const pearson = require('./pearson')

/**
 * @param {Number} k number of clusters
 * @param {Number} maxIterations max iterations to run
 * @param {[]} blogs the blogs to cluster
 * @param {Number} n word count
 */
const kMeans = (k, maxIterations, blogs, n) => {
  const centroids = initializeRandomCentroids(k, n, blogs)

  for (let i = 0; i < maxIterations; i++) {
    setPrevAssignments(centroids)

    blogs.forEach(blog => assignToClosest(centroids, blog, n))
    updateMean(centroids, n)

    if (centroids.every(centroid => centroid.isAssignmentsUnchanged())) {
      break
    }
  }

  return new Promise(resolve => resolve(centroids))
}

/**
 * create k centroids and set random generated word counts
 * @param {Number} k number of clusters
 * @param {Number} n word count
 * @param {[]} blogs blogs to cluster
 */
const initializeRandomCentroids = (k, n, blogs) => {
  const centroids = []

  for (let c = 0; c < k; c++) {
    let centroid = new Centroid()

    for (let i = 0; i < n; i++) {
      const random = getRandomFromRange(getWordCountRange(i, blogs))
      centroid.setWordCount(i, random)
    }

    centroids.push(centroid)
  }

  return centroids
}

/**
 * @param {Number} wordIndex
 * @param {Object} blogs
 */
const getWordCountRange = (wordIndex, blogs) => {
  return blogs
    .map(blog => blog.wordCounts[wordIndex])
    .reduce(
      (range, current) => {
        return {
          min: Math.min(range.min, current),
          max: Math.max(range.max, current),
        }
      },
      { min: Infinity, max: -Infinity }
    )
}

const getRandomFromRange = ({ min, max }) => min + Math.random() * max

const setPrevAssignments = centroids => centroids.map(centroid => centroid.updatePrevAssignments())

/**
 * assign a blog to closets centroid
 * @param {Centroid[]} centroids the current centroids
 * @param {Object} blog the blog to assign
 * @param {Number} n word count
 */
const assignToClosest = (centroids, blog, n) => {
  let dist = Number.MAX_VALUE
  let closestCentroid

  centroids.forEach(centroid => {
    const cDist = pearson(blog, centroid, n)

    if (cDist < dist) {
      dist = cDist
      closestCentroid = centroid
    }
  })

  closestCentroid.setAssignment(blog)
}

/**
 * @param {Centroid[]} centroids current centroids
 * @param {Number} n word count
 */
const updateMean = (centroids, n) => {
  centroids.forEach(centroid => {
    for (let i = 0; i < n; i++) {
      let average = calcAverage(centroid.assignments, i)
      centroid.setWordCount(i, average)
    }
  })
}

/**
 * @param {[]} assignments the assigned blogs of a centroid
 * @param {Number} index word index
 */
const calcAverage = (assignments, index) =>
  assignments.reduce((blogs, current) => blogs + current.wordCounts[index], 0) / assignments.length

module.exports = kMeans
