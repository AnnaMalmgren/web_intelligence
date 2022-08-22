
const fs = require('fs')
const csv = require('neat-csv')
const db = require('../../config/db')


const populate = async (file) => {
    try {
        csv(fs.createReadStream(file.movies), { separator: ';' }).then(data => {
            let query = 'INSERT IGNORE INTO movies (movie_id, title, year) VALUES (?,?,?)'
            data.forEach(async obj => {
                await db.execute(query, [obj.MovieId, obj.Title, obj.Year])
            })
        })

        csv(fs.createReadStream(file.users), { separator: ';' }).then(data => {
            let query = 'INSERT IGNORE INTO users (user_id, name) VALUES (?,?)'
            data.forEach(async obj => {
                await db.execute(query, [obj.UserId, obj.Name])
            })
        })

        csv(fs.createReadStream(file.ratings), { separator: ';' }).then(data => {
            let query = 'INSERT IGNORE INTO ratings (movie_id, user_id, rating) VALUES (?,?,?)'
            data.forEach(async obj => {
                await db.execute(query, [obj.MovieId, obj.UserId, obj.Rating])
            })
        })
    } catch (err) {
        console.log(err.message)
    }
}

module.exports = populate