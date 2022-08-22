
'use strict'

const mysql = require('../../config/db')

const queryDB = async (sql, params) => {
  let [rows, fields] = await mysql.execute(sql, params)
  return rows
}

const allUsers = `
  SELECT * 
  FROM users
`

const allRatings = `
  SELECT * 
  FROM ratings
`

const ratedMoviesByUser = `
  SELECT *
  FROM ratings
  WHERE user_id = ?
`

const ratedMoviesByAllOtherUsers = `
  SELECT ratings.*, users.name
  FROM ratings 
    JOIN users ON ratings.user_id = users.user_id
    AND ratings.user_id <> ?
  `

const notSeenMovies = `
SELECT ratings.*, movies.title
FROM ratings
    INNER JOIN movies ON ratings.movie_id = movies.movie_id
      WHERE ratings.movie_id NOT IN (
         SELECT ratings.movie_id
         FROM ratings
         WHERE ratings.user_id = ?)
`

const resetItemBased = `
  TRUNCATE item_based
`
const itemBasedTable = `
  INSERT IGNORE INTO item_based(movie_id, sim_movie, sim) VALUES (?,?,?)
  `

const notSeenSimilarMovies = `
SELECT similar_movies.*,  movies.title
FROM movies
    INNER JOIN (
       SELECT *
       FROM item_based 
       WHERE item_based.sim_movie IN (
           SELECT ratings.movie_id
           FROM ratings
           WHERE ratings.user_id = ?
        )
       AND item_based.movie_id NOT IN (
           SELECT ratings.movie_id
           FROM ratings
           WHERE ratings.user_id = ?
        )
    ) AS similar_movies
    ON movies.movie_id = similar_movies.movie_id
`

module.exports = {
  getAllUsers: async () => queryDB(allUsers),
  getAllRatings: async () => queryDB(allRatings),
  getRatedMovies: async (id) => queryDB(ratedMoviesByUser, [id]),
  getUsersRatedMovies: async (id) => queryDB(ratedMoviesByAllOtherUsers, [id]),
  getNotSeenMovies: async (id) => queryDB(notSeenMovies, [id]),
  getResetItemBased: async () => queryDB(resetItemBased),
  fillItemBasedTable: async (id, simMovie, sim) => queryDB(itemBasedTable, [id, simMovie, sim]),
  getItemBasedSimilarMovies: async (id) => queryDB(notSeenSimilarMovies, [id, id])
}
