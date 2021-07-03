const {Client} = require('pg');
require('dotenv').config()

const client = new Client({
    host: "localhost",
    user: `${process.env.USER}`,
    port: 5432,
    password: `${process.env.PASS}`,
    database: `${process.env.DB}`,
})

module.exports = client