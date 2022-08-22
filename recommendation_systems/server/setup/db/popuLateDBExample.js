'use strict'

const populate = require('./populate')

const file = {
  movies: `../../assignment-1/data_sets/${process.env.DATA_SET_EXAMPLE}/movies.csv`,
  users: `../../assignment-1/data_sets/${process.env.DATA_SET_EXAMPLE}/users.csv`,
  ratings: `../../assignment-1/data_sets/${process.env.DATA_SET_EXAMPLE}/ratings.csv`
}

populate(file)
console.log('Database populated with example data')
