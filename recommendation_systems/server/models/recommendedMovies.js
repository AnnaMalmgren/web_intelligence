'use strict'

const getSimilarUsers = require('./similarUsers')
const { getNotSeenMovies } = require('./DAL/queries')

const groupByMovieId = (notSeenMovies, users) => {
  return notSeenMovies.reduce((movies, current) => {
    const { user_id, movie_id, title, rating } = current
    const user = users.find(user => user.id === user_id)

    if (!movies[movie_id] && user) {
      movies[movie_id] = {
        id: movie_id,
        title: title,
        sim: user.score,
        weighted_score: user.score * rating
      }
    } else if (user) {
      movies[movie_id].sim += user.score
      movies[movie_id].weighted_score += user.score * rating
    }

    return movies
  }, {})
}

const getRecommendedMovies = async (id, metric) => {
  const scoredMovies = groupByMovieId(await getNotSeenMovies(id), await getSimilarUsers(id, metric))

  const result = []
  Object.values(scoredMovies).map(movie => {
    result.push({ title: movie.title, id: movie.id, score: movie.weighted_score / movie.sim })
  })

  result.sort((a, b) => b.score - a.score)

  return result
}

module.exports = getRecommendedMovies
