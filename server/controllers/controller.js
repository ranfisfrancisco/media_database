const conn = require('../database/initConn');

module.exports.home = async (req, res) => {
	res.send("Server")
}

module.exports.getAllMedia = async (req, res) => {
	let query = `SELECT id, name, releaseDate, useDate, type, format, status FROM media_items
	NATURAL JOIN media_types
	NATURAL JOIN media_formats
	NATURAL JOIN media_statuses
	ORDER BY id;`; 

	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ message:"GET_ALL_SUCCESS", result });
	});
}

module.exports.searchByID = async (req, res) => {
	let { mediaID } = req.params;
	let query = `SELECT id, name, releaseDate, useDate, type, format, status FROM media_items
	NATURAL JOIN media_types
	NATURAL JOIN media_formats
	NATURAL JOIN media_statuses
	WHERE ID=${mediaID};`; 

	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ message:"GET_BY_ID_SUCCESS", result });
	});
}

module.exports.searchByName = async (req, res) => {
	let { mediaName } = req.params;
	let query = 
	`SELECT id, name, releaseDate, useDate, type, format, status FROM media_items
	NATURAL JOIN media_types
	NATURAL JOIN media_formats
	NATURAL JOIN media_statuses
	WHERE name LIKE "%${mediaName}%"`; 

	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: mediaName });
		res.send({ message:"GET_BY_NAME_SUCCESS", result });
	});
}
