const {Pool} = require('pg')
const pool = new Pool(
    {
        database:'bcrypt',
        host: 'localhost',
        port:5432,
        password:'3311',
        user:'postgres'
    }
)

module.exports = pool