'use strict'
const { getRatedMovies, getUsersRatedMovies } = require('../models/DAL/queries')

const groupRatingsByUserId = (ratings) => {
  return ratings.reduce((users, current) => {
    const { user_id, name, movie_id, rating } = current

    users[user_id] ? users[user_id].ratings.push({ movie_id: movie_id, rating: rating }) :
      users[user_id] = {
        name: name,
        id: user_id,
        ratings: [{ movie_id: movie_id, rating: rating }]
      }
    return users
  }, {})
}

const getSimilarUsers = async (id, simMetric) => {
  const userRatings = await getRatedMovies(id)
  const othersRatings = groupRatingsByUserId(await getUsersRatedMovies(id))

  let similarity = []
  Object.values(othersRatings).forEach(user => {
    let sim = simMetric(userRatings, user.ratings)
    if (sim > 0) {
      similarity.push({ name: user.name, id: user.id, score: sim })
    }
  })

  similarity.sort((a, b) => b.score - a.score)
  return similarity
}

module.exports = getSimilarUsers
