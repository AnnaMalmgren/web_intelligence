'use strict'

function pearson(userA, userB) {
  let sumA = 0; let sumB = 0; let sumAsq = 0; let sumBsq = 0; let pSum = 0
  let commonMovies = 0

  userA.forEach(ratingA => {
    userB.forEach(ratingB => {
      if (ratingB.movie_id === ratingA.movie_id) {
        sumA += ratingA.rating
        sumB += ratingB.rating
        sumAsq += ratingA.rating ** 2
        sumBsq += ratingB.rating ** 2
        pSum += ratingA.rating * ratingB.rating
        commonMovies += 1
      }
    })
  })

  let num = pSum - (sumA * sumB / commonMovies)
  let den = Math.sqrt((sumAsq - sumA ** 2 / commonMovies) * (sumBsq - sumB ** 2 / commonMovies))

  // make sure zero is returned if no common movies
  return commonMovies > 0 ? (num / den) : 0
}

module.exports = pearson
