const metric = {
  EUCLIDEAN: 'euclidean',
  PEARSON: 'pearson'
}

const type = {
  SIMILAR_USERS: 'similar-users',
  REC_MOVIES: 'recommended-movies',
  ITEM_BASED: 'recommended-movies/itemBased'
}

module.exports = {
  type: type,
  metric: metric
}
