const {Pool} = require('pg')
const pool = new Pool(
    {
        user:'postgres',
        host:"localhost",
        database:"books_Express&SQL",
        password:"3311",
        port:5432
    }
)

module.exports = pool