const conn = require('../database/initConn');

module.exports.getAllMedia = async (req, res) => {
	let { bId, docId, copyNo, position } = req.body;
	position = position ? position : 'NULL';
	let query = `
		INSERT INTO COPY 
		VALUES (${docId}, ${copyNo}, ${bId}, \'${position}\')`; 
	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ result });
	});
}
