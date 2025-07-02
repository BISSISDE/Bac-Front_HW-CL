const {Pool} = require('pg')
const pool = new Pool({
  database: "food_Insert&Post",
  user:"postgres",
  password:"3311",
  host:'localhost',
  port:5432
});

module.exports = pool