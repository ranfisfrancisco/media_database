const conn = require('../database/initConn');

module.exports.home = async (req, res) => {
	res.send("Server")
}

module.exports.search = async (req, res) => {
	let filters = 
	[{col: "id", val: req.query.id || ""},
	{col: "name", val: req.query.name || ""},
	{col: "type_ID", val: req.query.type_ID || ""},
	{col: "format_ID", val: req.query.format_ID || ""},
	{col: "status_ID", val: req.query.status_ID || ""},
	]
	let matchName = false;
	let whereClause = "";

	if (req.query.matchName && (req.query.matchName === "1" || req.query.matchName === "true"))
		matchName = true;

	if (req.query.id || req.query.name ||req.query.type_ID || req.query.format_ID || req.query.status_ID){
		whereClause = "WHERE ";
		let numOfStatements = 0;

		for (var f of filters){
			if (f.val !== ""){
				if(numOfStatements > 0)
					whereClause += " AND ";

				if (f.col !== "name"){
					whereClause += ` ${f.col}=${f.val} `;
				}
				else{
					//if true, match exact name, else use LIKE for closest match
					if (matchName)
						whereClause += ` ${f.col} = "${f.val}" `;
					else
						whereClause += ` ${f.col} LIKE "%${f.val}%" `;
				}
				numOfStatements++;
			}
		}
	}

	let query = `SELECT id, name, releaseDate, useDate, type, format, status FROM media_items
	NATURAL JOIN media_types
	NATURAL JOIN media_formats
	NATURAL JOIN media_statuses ` + whereClause + 
	`ORDER BY id;`; 

	console.log(query);

	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error!' });
		res.send({ message:"GET_MEDIA_SUCCESS", result });
	});
}

module.exports.getAllTypes = async (req, res) => {
	let query = `SELECT *
	FROM media_types
	ORDER BY type;`; 

	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ message:"GET_ALL_MEDIA_TYPES_SUCCESS", result });
	});
}

module.exports.getAllFormats = async (req, res) => {
	let query = `SELECT *
	FROM media_formats
	order by format_id `; 

	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ message:"GET_ALL_MEDIA_FORMATS_SUCCESS", result });
	});
}

module.exports.getAllStatuses = async (req, res) => {
	let query = `SELECT *
	FROM media_statuses
	order by status_id `; 

	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ message:"GET_ALL_MEDIA_STATUSES_SUCCESS", result });
	});
}

//Depreciated. Equivalent to calling search with no parameters
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

//Depreciated. Use search instead.
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

//Depreciated. Use search instead.
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