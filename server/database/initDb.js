require('dotenv').config();
const mysql = require('mysql');

const con = mysql.createConnection({
	host: process.env.MYSQLHOST,
	port: process.env.MYSQLPORT,
	user: process.env.MYSQLUSER,
	password: process.env.MYSQLPASS,
	insecureAuth: true
});

con.connect((err) => {
	if(err) throw err;
	console.log('Connected to MySQL!');
});