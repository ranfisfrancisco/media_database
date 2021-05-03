const conn = require('../database/initConn');

module.exports.login = async (req, res) => {
	let { adminId, password } = req.body;
	// hard-coded placeholder for now
	if(adminId === 'tom' && password === 'password') return res.send({ message: 'LOGIN_SUCCESS' });
	else return res.status(400).json({ message: 'LOGIN_FAILED' });
}

module.exports.addDocCopy = async (req, res) => {
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

module.exports.getDocCopy = async (req, res) => {
	let { bId, docId, copyNo } = req.params;
	let borrowedFlag = false;
	let reservedFlag = false;
	let checkIfBorrowedQuery = `
		SELECT *
		FROM COPY NATURAL JOIN BORROWS NATURAL JOIN BORROWING
		WHERE RDTIME IS NULL AND DOCID=${docId} AND COPYNO=${copyNo} and BID=${bId}`;
	let checkIfReservedQuery = `
		SELECT *
		FROM COPY NATURAL JOIN RESERVES
		WHERE DOCID=${docId} AND COPYNO=${copyNo} AND BID=${bId}`;
	let query = `
		SELECT TITLE, PUBLISHERID
		FROM DOCUMENT 
		WHERE DOCID=${docId}`;
	conn.query(checkIfBorrowedQuery, (err, result) => {
		if(result.length > 0) borrowedFlag = true;
		conn.query(checkIfReservedQuery, (err, result) => {
			if(result.length > 0) reservedFlag = true;
			conn.query(query, (err, result) => {
				if(err) return res.status(400).json({ message: 'Query error' });
				res.send({ result, reserved: reservedFlag, borrowed: borrowedFlag });
			});
		});
	});
}

module.exports.addReader = async (req, res) => {
	let { type, name, address, phone } = req.body;
	let query = `
		INSERT INTO READER
		VALUES (NULL, \'${type}\', \'${name}\', \'${address}\', \'${phone}\')`;
	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ result });
	});
}

module.exports.getBranchInfo = async (req, res) => {
	let { bId } = req.params;
	let query = `
		SELECT LNAME, ADDRESS
		FROM BRANCH
		WHERE BID=${bId}`;
	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ result });
	});
}

// error 
module.exports.topBranchBorrowers = async (req, res) => {
	let { branchNum, maxBorrowers } = req.params;
	let query = `
		SELECT RID, RNAME, COUNT(RID)
		FROM READER NATURAL JOIN BORROWS
		WHERE BID=${branchNum}
		GROUP BY RID, RNAME
		ORDER BY COUNT(RID) DESC
		LIMIT ${maxBorrowers}`;
	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ result });
	});
}

module.exports.topLibraryBorrowers = async (req, res) => {
	let { maxBorrowers } = req.params;
	let query = `
		SELECT RID, RNAME, COUNT(RID)
		FROM BORROWS NATURAL JOIN READER
		GROUP BY RID, RNAME
		ORDER BY COUNT(RID) DESC
		LIMIT ${maxBorrowers}`;
	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ result });
	});
}

module.exports.topBorrowedBooksBranch = async (req, res) => {
	let { branchNum, maxBorrowers } = req.params;
	// ISBN, TITLE, PUBLISHER
	let query = `
		SELECT DOCID, COUNT(DOCID), TITLE, PUBLISHERID, PUBNAME
		FROM BORROWS NATURAL JOIN DOCUMENT NATURAL JOIN PUBLISHER
		WHERE BID=${branchNum} AND DOCID IN (
			SELECT DOCID
			FROM BOOK
		)
		GROUP BY DOCID
		ORDER BY COUNT(DOCID) DESC
		LIMIT ${maxBorrowers}`;
	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ result });
	});
}

module.exports.topBorrowedBooksLibrary = async (req, res) => {
	let { maxBorrow } = req.params;
	let query = `
		SELECT DOCID, COUNT(DOCID), TITLE, PUBLISHERID, PUBNAME
		FROM BORROWS NATURAL JOIN DOCUMENT NATURAL JOIN PUBLISHER
		WHERE DOCID IN (
			SELECT DOCID 
			FROM BOOK
		)
		GROUP BY DOCID
		ORDER BY COUNT(DOCID) DESC
		LIMIT ${maxBorrow}`;
	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ result });
	});
}

module.exports.topBorrowedBooksLibraryByYear = async (req, res) => {
	let { year } = req.params;
	let yearStart = `${year}-01-01 00:00:01`;
	let yearEnd = `${year}-12-31 11:59:59`;
	let query = `
		SELECT DOCID, COUNT(DOCID), TITLE, PUBLISHERID, PUBNAME
		FROM BORROWS NATURAL JOIN BORROWING NATURAL JOIN DOCUMENT NATURAL JOIN PUBLISHER
		WHERE BDTIME BETWEEN CAST(\'${yearStart}\' AS DATETIME) AND CAST(\'${yearEnd}\' AS DATETIME) AND DOCID IN (
			SELECT DOCID
			FROM BOOK
		)
		GROUP BY DOCID
		ORDER BY COUNT(DOCID) DESC
		LIMIT 10`;
	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ result });
	});
}

module.exports.averageBranchBorrowingFine = async (req, res) => {
	let { startDate, endDate } = req.params;
	let query = `
		SELECT BID, LNAME, AVG((DATEDIFF(RDTIME, BDTIME) - 6) * 0.75) AS AVG_FINES
		FROM BRANCH NATURAL JOIN BORROWS NATURAL JOIN BORROWING
		WHERE RDTIME IS NOT NULL AND DATEDIFF(RDTIME, BDTIME) > 6 
			AND CAST(BDTIME AS DATE) BETWEEN CAST(\'${startDate}\' AS DATE)
			AND CAST(\'${endDate}\' AS DATE)
		GROUP BY BID, LNAME`;
	console.log(query);
	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ result });
	});
}
