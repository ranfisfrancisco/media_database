require('dotenv').config()
const mysql = require('mysql2');

var conn = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_SCHEMA,
  multipleStatements: true
});

module.exports = conn;
