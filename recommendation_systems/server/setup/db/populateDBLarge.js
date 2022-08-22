'use strict'

const populate = require('./populate')

const file = {
  movies: `../../assignment-1/data_sets/${process.env.DATA_SET_LARGE}/movies.csv`,
  users: `../../assignment-1/data_sets/${process.env.DATA_SET_LARGE}/users.csv`,
  ratings: `../../assignment-1/data_sets/${process.env.DATA_SET_LARGE}/ratings.csv`
}

try {

  populate(file)
  console.log('Database populated with large movie data set')

} catch (err) {
  console.log(err.message)
}

