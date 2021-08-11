require('dotenv').config();
const conn = require('../database/initConn');
var toUnnamed = require('named-placeholders')();
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

async function verify(token, clientID) {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
		// Or, if multiple clients access the backend:
		//[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
	});
	const payload = ticket.getPayload();
	const userid = payload['sub'];
  }

const authenticateAPIKey = (key) => {
	return key === process.env.API_KEY;
}

const processDateRange = (range) => {
	if (range?.length !== 2)
		return null;
	return range;
}

const processNumber = (num) => {
	if (typeof num === "number")
		return num
	return null;
}

module.exports.home = async (req, res) => {
	res.send("Server")
}

/*
Function for loggin in a user.
EXPECTS req body to have 
string: user_email
string: id_token
*/
module.exports.userLogin = async (req, res) => {
	if (!authenticateAPIKey(req.body.api_key))
		return res.status(401).json({ message: 'Unauthorized API Key' });

	if (!req.body.user_email)
		return res.status(400).json({ message: 'Input error: did not provide email of user' });
	
	if (!req.body.id_token)
		return res.status(400).json({ message: 'Input error: did not provide ID token.' });

	let userEmail = req.body.user_email;
	let idToken = req.body.id_token;
	let verified = true;

	await verify(idToken).catch((error) => {
		console.error(error);
		verified=false;
	});		

	if (!verified)
		return res.status(400).json({ message: 'Failed to verify google login' });
	
	let idQuery = toUnnamed(`SELECT user_id
	FROM users
	WHERE user_email=:user_email;`, {
		user_email: userEmail
	});

	//check if user exists
	conn.query(idQuery[0], idQuery[1], (err, result) => {
		if (err){
			console.log(err)
		 	return res.status(400).json({ message: 'Query error' });
		}

		//user does not exist
		if (result.length === 0){
			//insert new user
			let insertQuery = toUnnamed(`INSERT INTO users (user_email, last_login_date)
			VALUES (:user_email, CURRENT_TIMESTAMP());`, {
				user_email: userEmail
			})

			conn.query(insertQuery[0], insertQuery[1], (err, result) => {
				if(err) return res.status(400).json({ message: 'Query error' });
			});

			// //grab new ID
			// conn.query(idQuery, (err, result) => {
			// 	if(err) {
			// 		console.log(err)
			// 		return res.status(400).json({ message: 'Query error' });
			// 	}
			// 	res.send({ message: "USER_SERVER_LOGIN_SUCCESS", result });
			// 	return;
			// });
		} 

		/*
		SESSION MANAGEMENT
		*/

		let session=req.session;
        session.userid=req.body.user_email;
        console.log(req.session)
		/*app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});*/

		/*
		SESSION MANAGEMENT
		*/

		let updateQuery = toUnnamed(`UPDATE users SET last_login_date=CURRENT_TIMESTAMP() WHERE user_email=:user_email`, {
			user_email: userEmail
		});

		conn.query(updateQuery[0], updateQuery[1], (err, result) => {
			if(err) {
				console.log(err)
				return res.status(400).json({ message: 'Query error' });
			}
			//grab new ID
			conn.query(idQuery[0], idQuery[1], (err, result) => {
				if(err) {
					console.log(err)
					return res.status(400).json({ message: 'Query error' });
				}
				res.send({ message: "USER_SERVER_LOGIN_SUCCESS", result });
				return;
			});
		});
	});
}

/*
Function for creating new media item.
EXPECTS req body to have 
int: user_id (the ID of the user) 
string: name
int: type_id
string: api_key
Will return error without these values.

OPTIONAL: req body can also include:
int: ownership_id
int: status_id
date (as string): use_date
date (as string): release_date
*/
module.exports.createMediaItem = async (req, res) => {
	if (!authenticateAPIKey(req.body.api_key))
		return res.status(401).json({ message: 'Unauthorized API Key' });

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
		{col: "ownership_id", val: req.body.ownership_id || null},
		{col: "status_id", val: req.body.status_id || null},
		{col: "use_date", val: req.body.use_date || null},
		{col: "release_date", val: req.body.release_date || null},
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

			if (cv.col === "name" || cv.col === "use_date" || cv.col === "release_date"){
				valueClause += `:${cv.col}`;
			} else {
				valueClause += `:${cv.col}`;
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

	let formattedQuery = toUnnamed(query, {
		user_id: req.body.user_id,
		name: req.body.name,
		type_id: req.body.type_id,
		ownership_id: req.body.ownership_id,
		status_id: req.body.status_id,
		use_date: req.body?.use_date,
		release_date: req.body?.release_date,
	});

	conn.query(formattedQuery[0], formattedQuery[1], (err, result) => {
		if(err) {
			console.log(err);
			return res.status(400).json({ message: 'Query error' });
		}
		res.send({ message:"CREATE_MEDIA_SUCCESS", result });
	});
}


/*
Function for searching media item table.

EXPECTS req.query to have
int: user_id (the ID of the user) 
string: api_key

OPTIONAL: req.query can include:
int: id
string: name
int: type_id
int: ownership_id
int: status_id
date (as string): use_date
date (as string): release_date
bool: exact_name_search (determines whether inputted name should match exactly)
int (as string): filter_null_release_date (determines whether null results for release date should be returned)
int (as string): filter_null_use_date (determines whether null results for release date should be returned)
	0 indicates null values can be returned. This is the default.
	1 indicates null values should be filtered out.
	2 indicates ONLY null values should be returned.
	All other integers are ignored.

Returns JSON object with:
message: string with success or failure description
resut: array of objects each representing a row in the array
*/
module.exports.searchMediaItem = async (req, res) => {
	let session = req.session;
	
	if (!session.userid)
		return res.status(401).json({ message: 'Invalid session ID' });

	if (!authenticateAPIKey(req.query.api_key))
		return res.status(401).json({ message: 'Unauthorized API Key' });

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
	let filterNullReleaseDate = 0;
	let filterNullUseDate = 0;
	let whereClause = "";

	if (req.query.exact_name_search === "1" || req.query.exact_name_search === "true")
		exactNameSearch = true;

	if (req.query.filter_null_release_date === "1" || req.query.filter_null_release_date === "2")
		filterNullReleaseDate = req.query.filter_null_release_date;

	if (req.query.filter_null_use_date === "1" || req.query.filter_null_use_date === "2")
		filterNullUseDate = req.query.filter_null_use_date;

	whereClause = "WHERE ";
	let statementCount = 0;

	if (!exactNameSearch)
		req.query.name = `%${req.query.name}%`;

	for (var f of [
			{var: filterNullReleaseDate, col: "release_date"},
			{var: filterNullUseDate, col: "use_date"}]
		){
		
		if (f.var === "1"){
			if(statementCount > 0)
				whereClause += " AND ";
			whereClause += ` ${f.col} IS NOT NULL `;
			statementCount++;
		} else if (f.var === "2") {
			if(statementCount > 0)
				whereClause += " AND ";
			whereClause += ` ${f.col} IS NULL `;
			statementCount++;
		}
	}

	for (var f of filters){
		if (f.val !== null){
			if(statementCount > 0)
				whereClause += " AND ";

			if (f.col === "name"){
				//if true, match exact name, else use LIKE for closest match
				whereClause += ` ${f.col} LIKE :${f.col} `;
			} else if (f.col === "use_date" || f.col === "release_date"){
				whereClause += ` ${f.col} BETWEEN :${f.col}_lower AND :${f.col}_upper`;
			}
			else{
				whereClause += ` ${f.col} = :${f.col} `;
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

	let formattedQuery = toUnnamed(query, {
		user_id: req.query.user_id,
		media_id: req.query.media_id,
		name: req.query.name,
		type_id: req.query.type_id,
		ownership_id: req.query.ownership_id,
		status_id: req.query.status_id,
		use_date_lower: req.query?.use_date_range?.[0],
		use_date_upper: req.query?.use_date_range?.[1],
		release_date_lower: req.query?.release_date_range?.[0],
		release_date_upper: req.query?.release_date_range?.[1],
	});

	conn.query(formattedQuery[0], formattedQuery[1], (err, result) => {
		if (err){
			console.log(err);
			return res.status(400).json({ message: err.message });
		}
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
	if (!authenticateAPIKey(req.body.api_key))
		return res.status(401).json({ message: 'Unauthorized API Key' });

	let filters = 
	[{col: "name", val: (req.body.name) ? req.body.name.trim() : null},
	{col: "type_id", val: processNumber(req.body.type_id)},
	{col: "ownership_id", val: processNumber(req.body.ownership_id)},
	{col: "status_id", val: processNumber(req.body.status_id)},
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

			setClause += `${f.col}=:${f.col}`
			statementCount++;
		}
	}

	if (statementCount === 0){
		return res.status(400).json({ message: 'Input error: provided no columns to update' });
	}

	let query = `UPDATE media_items
	SET ${setClause}
	WHERE media_id IN (:id_list);`; 

	let formattedQuery = toUnnamed(query, {
		id_list: idList,
		user_id: req.body.user_id,
		media_id: req.body.media_id,
		name: req.body.name,
		type_id: req.body.type_id,
		ownership_id: req.body.ownership_id,
		status_id: req.body.status_id,
		use_date: req.body?.use_date,
		release_date: req.body?.release_date,
	});

	conn.query(formattedQuery[0], formattedQuery[1], (err, result) => {
		if(err) {
			console.log(err);
			return res.status(400).json({ message: 'Query error' });
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
	if (!authenticateAPIKey(req.body.api_key))
		return res.status(401).json({ message: 'Unauthorized API Key' });

	let idList = (req.body.media_id_list) ? req.body.media_id_list : [];

	if (idList.length < 1)
		return res.status(400).json({ message: 'Input error: did not provide list of ID to delete' });

	let query = `DELETE FROM media_items
	WHERE media_id IN (:id_list);`; 

	let formattedQuery = toUnnamed(query, {
		id_list: idList,
	});

	conn.query(formattedQuery[0], formattedQuery[1], (err, result) => {
		if(err) {
			console.log(err);
			return res.status(400).json({ message: 'Query error' });
		}
		res.send({ message:"DELETE_MEDIA_SUCCESS", result });
	});
}

module.exports.getAllTypes = async (req, res) => {
	if (!authenticateAPIKey(req.query.api_key))
		return res.status(401).json({ message: 'Unauthorized API Key' });

	let query = `SELECT type_id AS id, type AS "option"
	FROM media_types
	ORDER BY type;`; 

	conn.query(query, (err, result) => {
		if(err){
			console.log(err)
			return res.status(400).json({ message: err.message });
		} 
		res.send({ message:"GET_ALL_MEDIA_TYPES_SUCCESS", result });
	});
}

module.exports.getAllOwnerships = async (req, res) => {
	if (!authenticateAPIKey(req.query.api_key))
		return res.status(401).json({ message: 'Unauthorized API Key' });

	let query = `SELECT ownership_id AS id, ownership AS "option"
	FROM media_ownerships
	order by ownership_id `; 

	conn.query(query, (err, result) => {
		if(err){
			console.log(err)
			return res.status(400).json({ message: err.message });
		} 
		res.send({ message:"GET_ALL_MEDIA_OWNERSHIPS_SUCCESS", result });
	});
}

module.exports.getAllStatuses = async (req, res) => {
	if (!authenticateAPIKey(req.query.api_key))
		return res.status(401).json({ message: 'Unauthorized API Key' });
		
	let query = `SELECT status_id AS id, status AS "option"
	FROM media_statuses
	order by status_id `; 

	conn.query(query, (err, result) => {
		if(err){
			console.log(err)
			return res.status(400).json({ message: err.message });
		} 
		res.send({ message:"GET_ALL_MEDIA_STATUSES_SUCCESS", result });
	});
}
