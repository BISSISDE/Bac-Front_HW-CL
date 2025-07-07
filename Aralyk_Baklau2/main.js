const {Pool} = require('pg')
const pool = new Pool (
    {
        user: 'postgres',
        database: 'baqlauDB',
        port: 5432,
        password:'3311',
        host:'localhost'
    }
)

module.exports = pool