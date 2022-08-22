'use strict'

const db = require('../../config/db')

const movies = `
TRUNCATE movies
`
const users = `
TRUNCATE users
`

const ratings = `
TRUNCATE ratings
`

const itemBased = `
TRUNCATE item_based;
`
try {
    db.execute(movies).then(result => console.log('movies table is emptied'))
    db.execute(users).then(result => console.log('users table is emptied'))
    db.execute(ratings).then(result => console.log('ratings table is emptied'))
    db.execute(itemBased).then(result => console.log('item based table is emptied'))
} catch (err) {
    console.log(err.message)
}

module.exports = {
    resetItemBased: async () => db.execute(itemBased).then(result => console.log('item based table is emptied'))
}