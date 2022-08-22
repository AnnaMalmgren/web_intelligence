'use strict'

// recursively calls itself to create a tree representation
const hierarchyClusters = node => {
  if (node.left !== null) {
    const left = hierarchyClusters(node.left)
    node.children = node.children ? [...node.children, left] : [left]
  }

  if (node.right !== null) {
    const right = hierarchyClusters(node.right)
    node.children = node.children ? [...node.children, right] : [right]
  }

  return node.distance === 0
    ? { leaf: true, value: node.blog.title }
    : { leaf: false, value: node.children }
}

const kMeansCentroids = centroids => {
  return centroids.map((centroid, i) => {
    return {
      title: `centroid ${i + 1}`,
      assignments: centroid.assignments.map(assignment => assignment.title),
    }
  })
}

module.exports = {
  formatHierarchyClusters: node => hierarchyClusters(node),
  formatKMeansCentroids: centroids => kMeansCentroids(centroids),
}
