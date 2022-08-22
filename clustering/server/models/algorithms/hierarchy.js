'use strict'
const _ = require('lodash')
const Cluster = require('../types/cluster')
const pearson = require('./pearson')

/**
 * @param {[]} blogs the blogs to cluster
 * @param {Number} wordCount number of words
 */
const hierarchy = (blogs, wordCount) => {
  let clusters = generateClusters(blogs)

  while (clusters.length > 1) {
    iterate(clusters, wordCount)
  }

  return new Promise(resolve => resolve(clusters[0]))
}

/**
 * create a cluster for each blog
 * @param {[]} blogs the blogs to cluster
 */
const generateClusters = blogs => blogs.map(blog => new Cluster(blog))

/**
 * find two nearest clusters and merge
 * @param {Cluster[]} clusters the clusters to iterate
 * @param {Number} wordCount number of words
 */
const iterate = (clusters, wordCount) => {
  let closest = Number.MAX_VALUE
  let A
  let B

  clusters.forEach(clusterA => {
    clusters.forEach(clusterB => {
      if (clusterA !== clusterB) {
        let cDist = pearson(clusterA.blog, clusterB.blog, wordCount)

        if (cDist < closest) {
          closest = cDist
          A = clusterA
          B = clusterB
        }
      }
    })
  })

  clusters.push(merge(A, B, closest, wordCount))
  _.remove(clusters, cluster => cluster === A || cluster === B)
}

/**
 *
 * @param {Cluster} clusterA cluster to merge
 * @param {Cluster} clusterB cluster to merge
 * @param {Number} distance distance for clusterA and cluster B
 * @param {Number} numWords number of words
 */
const merge = (clusterA, clusterB, distance, numWords) => {
  let cluster = new Cluster()
  cluster.left = clusterA
  cluster.right = clusterB
  let blog = { wordCounts: [] }

  // get word counts for new cluster by take the average from cluster A and B
  for (let i = 0; i < numWords; i++) {
    blog.wordCounts[i] = (clusterA.blog.wordCounts[i] + clusterB.blog.wordCounts[i]) / 2
  }

  cluster.blog = blog
  cluster.distance = distance
  return cluster
}

module.exports = hierarchy
