const conn = require('../database/initConn');

module.exports.login = async (req, res) => {
	let { cardNumber } = req.body;
	let query = `
		SELECT *
		FROM PERSON
		WHERE PID=${cardNumber}`;
	conn.query(query, (err, result) => {
		if(err || result.length === 0) return res.status(400).json({ message: 'LOGIN_FAILED' });
		res.send({ message: 'LOGIN_SUCCESS', result });
	});
}

module.exports.searchDocById = async (req, res) => {
	let { docId } = req.params;
	let query = `
		SELECT * 
		FROM DOCUMENT 
		WHERE DOCID=${docId}`;
	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ result });
	});
}

module.exports.searchDocByTitle = async (req, res) => {
	let { title } = req.params;
	let query = `
		SELECT *
		FROM DOCUMENT
		WHERE TITLE='${title}'`;
	conn.query(query, (err, result) => {
		if(err) {
			console.log(err); 
			return res.status(400).json({ message: 'Query error' });
		}
		res.send({ result });
	});
}

module.exports.searchDocByPublisher = async (req, res) => {
	let { publisher } = req.params;
	let query = `
		SELECT *
		FROM DOCUMENT
		WHERE PUBLISHERID IN (
			SELECT PUBLISHERID
			FROM PUBLISHER
			WHERE PUBNAME='${publisher}'
		)`;
	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ result });
	});
}

module.exports.checkoutDoc = async (req, res) => {
	let { readerId, docId, copyNo, bId } = req.body;
	if(!readerId || !docId || !copyNo || !bId) return res.status(400).json({ message: 'Missing params' });
	let deleteQuery = `
		DELETE FROM RESERVATION
		WHERE RES_NO IN (
			SELECT RESERVATION_NO
			FROM RESERVES
			WHERE DOCID=${docId} AND COPYNO=${copyNo} AND BID=${bId} AND RID=${readerId}
		)`;
	let insertQuery = `
			INSERT INTO BORROWING
			VALUES (0, NOW(), NULL);
			INSERT INTO BORROWS
			VALUES (LAST_INSERT_ID(), ${docId}, ${copyNo}, ${bId}, ${readerId});`;
	let query = deleteQuery + insertQuery;
	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ result });
	});
}

module.exports.returnDoc = async (req, res) => {
	let { docId, copyNo, bId, readerId } = req.body;
	let query = `
		UPDATE BORROWING
		SET RDTIME=NOW()
		WHERE BOR_NO IN(
			SELECT BOR_NO
			FROM BORROWS
			WHERE DOCID=${docId} AND COPYNO=${copyNo} AND BID=${bId} and RID=${readerId}
		)`;
		conn.query(query, (err, result) => {
			if(err) return res.status(400).json({ message: 'Query error' });
			res.send({ result });
		});
}

module.exports.reserveDoc = async (req, res) => {
	let { docId, copyNo, bId, readerId } = req.body;
	let query = `
		INSERT INTO RESERVATION
		VALUES(0, NOW());
		INSERT INTO RESERVES
		VALUES(LAST_INSERT_ID(), ${docId}, ${copyNo}, ${bId}, ${readerId})`;
	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ result });
	});
}

module.exports.computeFine = async (req, res) => {
	let { docId, copyNo, bId, readerId } = req.body;
	let query = `
		SELECT GREATEST(DATEDIFF(CURDATE(), BDTIME) - 6, 0) * 0.75 AS FINES
		FROM BORROWING NATURAL JOIN BORROWS
		WHERE DOCID=${docId} AND COPYNO=${copyNo} AND BID=${bId} AND RID=${readerId};`;
	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ result });
	});
}

module.exports.getReserveDocs = async (req, res) => {
	let { readerId } = req.params;
	// include more fields later
	let query = `
		SELECT DTIME, DOCID
		FROM RESERVES JOIN RESERVATION ON (RESERVATION_NO=RES_NO)
		WHERE RID=${readerId}`;
	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ result });
	});
}

module.exports.getPublisherDocs = async (req, res) => {
	let { publisher } = req.params;
	let query = `
		SELECT DOCID, TITLE
		FROM DOCUMENT
		WHERE PUBLISHERID IN (
			SELECT PUBLISHERID
			FROM PUBLISHER
			WHERE PUBNAME='${publisher}'
		)`;
	console.log(query);
	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ result });
	});
}
