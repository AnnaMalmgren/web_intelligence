'use strict'
const { getItemBasedSimilarMovies, getRatedMovies } = require('./DAL/queries')


const groupBySimMovies = (seenMovies, simMovies) => {
  return simMovies.reduce((movies, current) => {
    const { movie_id, sim_movie, title, sim } = current
    const movie = seenMovies.find(movie => movie.movie_id === sim_movie)

    if (!movies[movie_id] && movie) { // make sure a seen movie simular to movie_id exists
      movies[movie_id] = {
        id: movie_id,
        title: title,
        sim: sim,
        weighted_score: sim * movie.rating
      }
    } else if (movie) {
      movies[movie_id].sim += sim
      movies[movie_id].weighted_score += sim * movie.rating
    }

    return movies
  }, {})
}

const getSimilarMovies = async (id) => {
  const similarMovies = groupBySimMovies(await getRatedMovies(id), await getItemBasedSimilarMovies(id))

  let result = []
  Object.values(similarMovies).map(movie => {
    result.push({ title: movie.title, id: movie.id, score: movie.weighted_score / movie.sim })
  })

  result.sort((a, b) => b.score - a.score)
  return result
}

module.exports = getSimilarMovies
