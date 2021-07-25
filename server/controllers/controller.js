const conn = require('../database/initConn');

const processDateRange = (range) => {
	if (!range || range.length !== 2)
		return null;
	return range;
}

module.exports.home = async (req, res) => {
	res.send("Server")
}

module.exports.searchMediaItems = async (req, res) => {
	let filters = 
	[
		{col: "id", val: req.query.id || null},
		{col: "name", val: req.query.name || null},
		{col: "type_ID", val: req.query.type_ID || null},
		{col: "format_ID", val: req.query.format_ID || null},
		{col: "status_ID", val: req.query.status_ID || null},
		{col: "use_date", val: processDateRange(req.query.use_date_range)},
		{col: "release_date", val: processDateRange(req.query.release_date_range)
	}];

	let exactNameSearch = false;
	let whereClause = "";

	if (req.query.exact_name_search && (req.query.exact_name_search === "1" || req.query.exact_name_search === "true"))
		exactNameSearch = true;

	whereClause = "WHERE ";
	let statementCount = 0;

	for (var f of filters){
		if (f.val !== null){
			if(statementCount > 0)
				whereClause += " AND ";

			if (f.col === "name"){
				//if true, match exact name, else use LIKE for closest match
				if (exactNameSearch)
					whereClause += ` ${f.col} = "${f.val}" `;
				else
					whereClause += ` ${f.col} LIKE "%${f.val}%" `;
			} else if (f.col === "use_date" || f.col === "release_date"){
				whereClause += ` ${f.col} BETWEEN "${f.val[0]}" AND "${f.val[1]}"`;
			}
			else{
				whereClause += ` ${f.col}=${f.val} `;
			}
			statementCount++;
		}
	}

	if (statementCount === 0)
		whereClause = "";

	let query = `SELECT id, name, release_date, use_date, type, format, status FROM media_items
	NATURAL JOIN media_types
	NATURAL JOIN media_formats
	NATURAL JOIN media_statuses 
	${whereClause}
	ORDER BY name;`; 

	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error!' });
		res.send({ message:"GET_MEDIA_SUCCESS", result });
	});
}

module.exports.updateMediaItems = async (req, res) => {
	let filters = 
	[{col: "name", val: (req.body.name) ? req.body.name.trim() : null},
	{col: "type_ID", val: req.body.type_ID || null},
	{col: "format_ID", val: req.body.format_ID || null},
	{col: "status_ID", val: req.body.status_ID || null},
	{col: "use_date", val: req.body.use_date},
	{col: "release_date", val: req.body.release_date},
	];

	let idList = (req.body.idList) ? req.body.idList : [];

	if (idList.length < 1){
		return res.status(400).json({ message: 'Input error: did not provide list of ID update' });
	}

	if (req.body.name && idList.length > 1){
		return res.status(400).json({ message: 'Input error: cannot change name of multiple items at the same time.' });
	}

	let setClause = "";
	let statementCount = 0;

	for (var f of filters){
		if (f.val !== null){
			if(statementCount > 0)
				setClause += ", ";

			if (f.col === "name"){
				setClause += `${f.col}="${f.val}"`
			} else if (f.col === "use_date" || f.col === "release_date"){
				setClause += `${f.col}="${f.val}"`
			} 
			else {
				setClause += `${f.col}=${f.val}`
			}
			statementCount++;
		}
	}

	if (statementCount === 0){
		return res.status(400).json({ message: 'Input error: provided no columns to update' });
	}

	let idClause = '(';
	let idCount = 0;
	for (var id of idList){
		if (idCount > 0)
			idClause += ', '

		idClause += `${id}`

		idCount++;
	}
	idClause += ')'

	let query = `UPDATE media_items
	SET ${setClause}
	WHERE id IN ${idClause};
	`; 

	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ message:"UPDATE_MEDIA_SUCCESS", result });
	});
}

module.exports.deleteMediaItems = async (req, res) => {
	let idList = (req.body.idList) ? req.body.idList : [];

	console.log(idList)
	if (idList.length < 1){
		return res.status(400).json({ message: 'Input error: did not provide list of ID to delete' });
	}
	console.log(idList)

	let idClause = '(';
	let idCount = 0;
	for (var id of idList){
		if (idCount > 0)
			idClause += ', '

		idClause += `${id}`

		idCount++;
	}
	idClause += ')'

	let query = `DELETE FROM media_items
	WHERE id IN ${idClause};`; 

	console.log(query)

	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ message:"DELETE_MEDIA_SUCCESS", result });
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