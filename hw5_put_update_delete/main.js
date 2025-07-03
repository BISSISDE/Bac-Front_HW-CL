const {Pool} = require('pg')
const pool = new Pool(
    {
        user:'postgres',
        host:'localhost',
        database:'users',
        port:5432,
        password:'3311'
    }
)

module.exports = pool