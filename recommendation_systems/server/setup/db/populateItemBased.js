'use strict'
const { getAllRatings, fillItemBasedTable, getResetItemBased } = require('../../models/DAL/queries')

function euclidean(movieA, movieB) {
  let sim = 0
  let commonMovies = 0

  movieA.ratings.forEach(ratingA => {
    movieB.ratings.forEach(ratingB => {
      if (ratingB.user_id === ratingA.user_id) {
        sim += (ratingA.rating - ratingB.rating) ** 2
        commonMovies += 1
      }
    })
  })

  return commonMovies > 0 ? (1 / (1 + sim)) : 0
}

const groupByMovieId = (ratings) => {
  return ratings.reduce((movies, current) => {
    const { movie_id, user_id, rating } = current

    movies[movie_id] ? movies[movie_id].ratings.push({ user_id: user_id, rating: rating }) :
      movies[movie_id] = {
        movie_id: movie_id,
        ratings: [{ user_id: user_id, rating: rating }]
      }

    return movies
  }, {})
}

const populateItemBased = async () => {
  try {
    await getResetItemBased()
    let ratedMovies = groupByMovieId(await getAllRatings())

    Object.values(ratedMovies).forEach(async movieA => {
      Object.values(ratedMovies).map(async movieB => {
        if (movieA.movie_id !== movieB.movie_id) {
          await fillItemBasedTable(movieA.movie_id, movieB.movie_id, euclidean(movieA, movieB))
        }
      })
    })

    console.log('item based table has been updated')
  } catch (err) {
    console.log(err.message)
  }
}


populateItemBased()

