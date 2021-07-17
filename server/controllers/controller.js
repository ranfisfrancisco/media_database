const conn = require('../database/initConn');

module.exports.home = async (req, res) => {
	res.send("Server")
}

module.exports.getAllTypes = async (req, res) => {
	let query = `SELECT *
	FROM media_types
	ORDER BY type;`; 

	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ message:"GET_ALL_TYPES_SUCCESS", result });
	});
}

module.exports.getAllFormats = async (req, res) => {
	let query = `SELECT *
	FROM media_formats
	order by format_id `; 

	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ message:"GET_ALL_FORMATS_SUCCESS", result });
	});
}

module.exports.getAllStatuses = async (req, res) => {
	let query = `SELECT *
	FROM media_statuses
	order by status_id `; 

	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ message:"GET_ALL_STATUSES_SUCCESS", result });
	});
}

module.exports.getAllMedia = async (req, res) => {
	let query = `SELECT id, name, releaseDate, useDate, type, format, status FROM media_items
	NATURAL JOIN media_types
	NATURAL JOIN media_formats
	NATURAL JOIN media_statuses
	ORDER BY id;`; 

	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ message:"GET_ALL_MEDIA_SUCCESS", result });
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
