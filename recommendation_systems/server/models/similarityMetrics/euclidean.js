'use strict'

function euclidean(userA, userB) {
  let sim = 0
  let commonMovies = 0

  userA.forEach(ratingA => {
    userB.forEach(ratingB => {
      if (ratingB.movie_id === ratingA.movie_id) {
        sim += (ratingA.rating - ratingB.rating) ** 2
        commonMovies += 1
      }
    })
  })

  // make sure zero is returned if no common movies
  return commonMovies > 0 ? (1 / (1 + sim)) : 0
}

module.exports = euclidean
