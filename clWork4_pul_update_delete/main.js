const {Pool} = require('pg')
const pool = new Pool({
  host: "localhost",
  port: 5432,
  password: "3311",
  user: "postgres",
  database: "restaurants",
});

module.exports = pool