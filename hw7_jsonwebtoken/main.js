const {Pool} = require('pg')
const pool = new Pool({
  user: "postgres",
  database: "jsonwebtoken",
  password: "3311",
  host: "localhost",
  port: 5432,
});

module.exports = pool