const mysql = require('mysql2')
require('dotenv').config()

const connection =
mysql
  .createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    waitForConnections: true,
    connectionLimit: 50,
    queueLimit: 200,
    dateStrings: true
  })
  .promise()

module.exports = connection
