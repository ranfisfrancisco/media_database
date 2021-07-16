const conn = require('../database/initConn');

module.exports.home = async (req, res) => {
	res.send("Server")
}

module.exports.getAllMedia = async (req, res) => {
	let query = `SELECT * FROM media_items`; 
	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ message:"GET_ALL_SUCCESS", result });
	});
}

module.exports.searchByID = async (req, res) => {
	let { mediaID } = req.params;
	let query = `SELECT * FROM media_items WHERE ID=${mediaID}`; 
	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ message:"GET_ALL_SUCCESS", result });
	});
}
