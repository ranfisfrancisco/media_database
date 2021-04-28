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
		INERT INTO COPY
		VALUES (${docId}, ${copyNo}, ${bId}, ${position})`; 
	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ result });
	});
}

module.exports.getDocCopy = async (req, res) => {
	let { bId, docId, copyNo } = req.params;
	let query = `
		SELECT BOR_NO
		FROM BORROWING NATURAL JOIN BORROWS
		WHERE DOCID=${docId} AND COPYNO=${copyNo} AND BID=${bId}
		AND TDTIME IS NULL`;
	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ result });
	});
}

module.exports.addReader = async (req, res) => {
	let { type, name, address, phone } = req.body;
	let query = `
		INSERT INTO READER
		VALUES (0, ${type}, ${name}, ${address}, ${phone})`;
	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ result });
	});
}

module.exports.getBranchInfo = async (req, res) => {
	let { bId } = req.params;
	let query = `
		SELECT LNAME, LOCATION
		FROM BRANCH
		WHERE BID=${bId}`;
	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ result });
	});
}

module.exports.topBranchBorrowers = async (req, res) => {
	let { branchNum, maxBorrowers } = req.params;
	let query = `
		SELECT RID, RNAME
		FROM READER
		WHERE RID IN (
			SELECT RID
			FROM BORROWS
			WHERE BID=${branchNum}
			GROUP BY RID
			ORDER BY COUNT(RID) DESC
			LIMIT ${maxBorrowers}
		);`;
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
		LIMIT ${maxBorrowers}
	`;
	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ result });
	});
}

module.exports.topBorrowedBooksBranch = async (req, res) => {
	let { branchNum, maxBorrowers } = req.params;
	let query = `
		SELECT DOCID
		FROM BORROWS
		WHERE BID=${branchNum} AND DOCID IN (
			SELECT DOCID
			FROM BOOK
		)
		GROUP BY DOCID
		ORDER BY COUNT(DOCID)
		LIMIT ${maxBorrow}`;
	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ result });
	});
}

module.exports.topBorrowedBooksLibrary = async (req, res) => {
	let { maxBorrow } = req.params;
	let query = `
		SELECT DOCID
		FROM BORROWS
		WHERE DOCID IN (
			SELECT DOCID 
			FROM BOOK
		)
		GROUP BY DOCID
		ORDER BY COUNT(DOCID)
		LIMIT ${maxBorrow}`;
	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ result });
	});
}

module.exports.topBorrowedBooksLibraryByYear = async (req, res) => {
	let { year } = req.params;
	let yearStart = `${year}-01-01 00:00:01.000`;
	let yearEnd = `${year}-12-31 11:59:59.000`;
	let query = `
		SELECT DOCID
		FROM BORROWS NATURAL JOIN BORROWING
		WHERE BDTIME BETWEEN CAST(${yearStart} AS DATETIME) AND CAST(${yearEnd} AS DATETIME) AND DOCID IN (
			SELECT DOCID
			FROM BOOK
		)
		GROUP BY DOCID
		ORDER BY COUNT(DOCID)
		LIMIT 10;`;
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
		WHERE RDTIME IS NOT NULL AND DATEDIFF(BDTIME, RDTIME) > 6 
			AND CAST(BDTIME AS DATE) BETWEEN CAST(${startDate} AS DATE)
			AND CAST(${endDate} AS DATE)
		GROUP BY BID, LNAME`;
	conn.query(query, (err, result) => {
		if(err) return res.status(400).json({ message: 'Query error' });
		res.send({ result });
	});
}
