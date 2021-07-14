const conn = require('../database/initConn');

module.exports.home = async (req, res) => {
	res.send("Hello World")
}

module.exports.getAllMedia = async (req, res) => {
	let query = `SELECT * FROM media_items`; 
	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ result });
	});
}
