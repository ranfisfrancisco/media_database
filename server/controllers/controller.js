const conn = require('../database/initConn');

const processDateRange = (range) => {
	if (range?.length !== 2)
		return null;
	return range;
}

module.exports.home = async (req, res) => {
	res.send("Server")
}

module.exports.userLogin = async (req, res) => {
	if (!req.body.user_email){
		return res.status(400).json({ message: 'Input error: did not provide email of user' });
	}

	let userEmail = req.body.user_email;

	let idQuery = `SELECT user_id
	FROM users
	WHERE user_email="${userEmail}";`

	//check if user exists
	conn.query(idQuery, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });

		//user does not exist
		if (result.length === 0){
			//insert new user
			let insertQuery = `INSERT INTO users (user_email)
			VALUES "${userEmail}";`

			conn.query(insertQuery, (err, result) => {
				if(err) return res.status(400).json({ message: 'Query error' });
			});

			//grab new ID
			conn.query(idQuery, (err, result) => {
				if(err) {
					console.log(err)
					return res.status(400).json({ message: 'Query error' });
				}
				res.send({ message:"USER_SERVER_LOGIN_SUCCESS", result });
				return;
			});
		} 

		return res.send({ message:"USER_SERVER_LOGIN_SUCCESS", result });
	});
}

/*
Function for creating new media item.
EXPECTS req body to have 
int: user_id (the ID of the user) 
string: name
int: type_id
Will return error without these values.

OPTIONAL: req body can also include:
int: ownership_id
int: status_id
date (as string): use_date
date (as string): release_date
*/
module.exports.createMediaItem = async (req, res) => {
	if (!req.body.user_id)
		return res.status(400).json({ message: 'Input error: did not provide user ID' });

	if (!req.body.name)
		return res.status(400).json({ message: 'Input error: did not provide name of new item' });
	
	if (!req.body.type_id)
		return res.status(400).json({ message: 'Input error: did not provide type_id of new item' });
	
	let colValues = 
	[
		{col: "user_id", val: req.body.user_id},
		{col: "name", val: (req.body.name) ? req.body.name.trim() : null},
		{col: "type_id", val: req.body.type_id || null},
		{col: "ownership_id", val: req.body.ownership_id || "DEFAULT"},
		{col: "status_id", val: req.body.status_id || "DEFAULT"},
		{col: "use_date", val: req.body.use_date || "DEFAULT"},
		{col: "release_date", val: req.body.release_date || "DEFAULT"},
	];

	let colClause = "";
	let valueClause = "";
	let statementCount = 0;

	for (var cv of colValues){
		if (cv.val !== null){
			if(statementCount > 0){
				colClause += ", ";
				valueClause += ", ";
			}

			colClause += `${cv.col}`;

			if (cv.col === "name"){
				valueClause += `"${cv.val}"`;
			} else {
				valueClause += `${cv.val}`;
			}
			
			statementCount++;
		}
	}

	if (statementCount === 0){
		return res.status(400).json({ message: 'Input error: provided no columns to update' });
	}

	let query = `INSERT INTO media_items
	(${colClause})
	VALUES (${valueClause});
	`; 

	conn.query(query, (err, result) => {
		if(err) {
			console.log(err)
			return res.status(400).json({ message: 'Query error' });
		}
		res.send({ message:"CREATE_MEDIA_SUCCESS", result });
	});
}


/*
Function for searching media item table.

EXPECTS req.query to have
int: user_id (the ID of the user) 

OPTIONAL: req.query can include:
int: id
string: name
int: type_id
int: ownership_id
int: status_id
date (as string): use_date
date (as string): release_date
bool: exact_name_search (determines whether inputted name should match exactly)

Returns JSON object with:
message: string with success or failure description
resut: array of objects each representing a row in the array
*/
module.exports.searchMediaItem = async (req, res) => {
	if (!req.query.user_id)
		return res.status(400).json({ message: 'Input error: did not provide user ID' });
		
	let filters = 
	[
		{col: "user_id", val: req.query.user_id},
		{col: "media_id", val: req.query.media_id || null},
		{col: "name", val: req.query.name || null},
		{col: "type_id", val: req.query.type_id || null},
		{col: "ownership_id", val: req.query.ownership_id || null},
		{col: "status_id", val: req.query.status_id || null},
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

	let query = `SELECT media_id, name, release_date, use_date, type, ownership, status, created_date FROM media_items
	NATURAL JOIN media_types
	NATURAL JOIN media_ownerships
	NATURAL JOIN media_statuses 
	${whereClause}
	ORDER BY name;`; 

	conn.query(query, (err, result) => {
		if(err) {
			console.log(err)
			return res.status(400).json({ message: 'Query error!' });
		}
		console.log(result)
		res.send({ message:"GET_MEDIA_SUCCESS", result });
	});
}

/*
Function for updating media item table.

EXPECTS req.body to have
int[]: media_id_list (List of ID's to be modified)
At least one optional argument.
Will return error otherwise.

OPTIONAL: req.query can include:
string: name (UNLESS id_list contains more than 1 ID)
int: type_id
int: ownership_id
int: status_id
date (as string): use_date
date (as string): release_date
*/
module.exports.updateMediaItem = async (req, res) => {
	let filters = 
	[{col: "name", val: (req.body.name) ? req.body.name.trim() : null},
	{col: "type_id", val: req.body.type_id || null},
	{col: "ownership_id", val: req.body.ownership_id || null},
	{col: "status_id", val: req.body.status_id || null},
	{col: "use_date", val: req.body.use_date || null},
	{col: "release_date", val: req.body.release_date || null},
	];

	let idList = (req.body.media_id_list) ? req.body.media_id_list : [];

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
	WHERE media_id IN ${idClause};
	`; 

	conn.query(query, (err, result) => {
		if(err) {
			return res.status(400).json({ message: 'Query error' });
			console.log(err)
		}
		res.send({ message:"UPDATE_MEDIA_SUCCESS", result });
	});
}

/*
Function for deleting an item from media item table.
EXPECTS: req.body to have
int[]: media_id_list (List of ID's to be deleted)
Will return error otherwise
*/
module.exports.deleteMediaItem = async (req, res) => {
	let idList = (req.body.media_id_list) ? req.body.media_id_list : [];

	if (idList.length < 1){
		return res.status(400).json({ message: 'Input error: did not provide list of ID to delete' });
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

	let query = `DELETE FROM media_items
	WHERE media_id IN ${idClause};`; 

	conn.query(query, (err, result) => {
		if(err) {
			console.log(err);
			return res.status(400).json({ message: 'Query error' });
		}
		res.send({ message:"DELETE_MEDIA_SUCCESS", result });
	});
}

module.exports.getAllTypes = async (req, res) => {
	let query = `SELECT type_id AS id, type AS "option"
	FROM media_types
	ORDER BY type;`; 

	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ message:"GET_ALL_MEDIA_TYPES_SUCCESS", result });
	});
}

module.exports.getAllOwnerships = async (req, res) => {
	let query = `SELECT ownership_id AS id, ownership AS "option"
	FROM media_ownerships
	order by ownership_id `; 

	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ message:"GET_ALL_MEDIA_OWNERSHIPS_SUCCESS", result });
	});
}

module.exports.getAllStatuses = async (req, res) => {
	let query = `SELECT status_id AS id, status AS "option"
	FROM media_statuses
	order by status_id `; 

	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ message:"GET_ALL_MEDIA_STATUSES_SUCCESS", result });
	});
}

//DEPRECIATED. Equivalent to calling search with no parameters
module.exports.getAllMedia = async (req, res) => {
	let query = `SELECT id, name, releaseDate, useDate, type, ownership, status FROM media_items
	NATURAL JOIN media_types
	NATURAL JOIN media_ownerships
	NATURAL JOIN media_statuses
	ORDER BY id;`; 

	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ message:"GET_ALL_MEDIA_SUCCESS", result });
	});
}

//DEPRECIATED. Use search instead.
module.exports.searchByID = async (req, res) => {
	let { mediaID } = req.params;
	let query = `SELECT id, name, releaseDate, useDate, type, ownership, status FROM media_items
	NATURAL JOIN media_types
	NATURAL JOIN media_ownerships
	NATURAL JOIN media_statuses
	WHERE ID=${mediaID};`; 

	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ message:"GET_BY_ID_SUCCESS", result });
	});
}

//DEPRECIATED. Use search instead.
module.exports.searchByName = async (req, res) => {
	let { mediaName } = req.params;
	let query = 
	`SELECT id, name, releaseDate, useDate, type, ownership, status FROM media_items
	NATURAL JOIN media_types
	NATURAL JOIN media_ownerships
	NATURAL JOIN media_statuses
	WHERE name LIKE "%${mediaName}%"`; 

	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: mediaName });
		res.send({ message:"GET_BY_NAME_SUCCESS", result });
	});
}