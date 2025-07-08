const {Pool} = require('pg')
const pool = new Pool (
    {
        user: 'postgres',
        database: 'tiktok',
        host:'localhost',
        port: 5432,
        password:'3311'
    }
)

module.exports = pool