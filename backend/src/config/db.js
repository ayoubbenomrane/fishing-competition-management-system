// db.js
const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cpsn",
  password: "Ayoub2003",
  port: 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};