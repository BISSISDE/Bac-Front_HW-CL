const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  password: "3311",
  host: "localhost",
  port: 5432,
  database: "users_cors_helmet",
});

module.exports = pool;
