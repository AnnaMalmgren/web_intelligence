'use strict'
const db = require('../../config/db')

const users = `
CREATE TABLE IF NOT EXISTS users (
    user_id INT NOT NULL, 
    name   VARCHAR(45) NOT NULL, 
PRIMARY KEY (user_id)
)
`
const movies = `
CREATE TABLE IF NOT EXISTS movies (
    movie_id INT NOT NULL, 
    title    VARCHAR(100) NOT NULL, 
    year     INT,
PRIMARY KEY (movie_id)
)
`
const ratings = `
CREATE TABLE IF NOT EXISTS ratings (
   user_id INT NOT NULL,
   movie_id INT NOT NULL,
   rating DOUBLE NOT NULL,
PRIMARY KEY (user_id, movie_id)
)
`
const itemBased = `
CREATE TABLE IF NOT EXISTS item_based (
    movie_id INT NOT NULL,
    sim_movie INT NOT NULL,
    sim DOUBLE NOT NULL,
 PRIMARY KEY (movie_id, sim_movie)
 )
`
try {
    db.execute(users).then(result => console.log('users table created'))
    db.execute(movies).then(result => console.log('movies table created'))
    db.execute(ratings).then((result) => console.log('raings table created'))
    db.execute(itemBased).then((result) => console.log('item based table created'))
} catch (err) {
    console.log(err.message)
}
