const mysql = require('mysql');

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123',
  multipleStatements: true,
});

module.exports = conn;