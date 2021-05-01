const mysql = require('mysql');

const con = require('./initConn');

con.connect((err) => {
	if(err) throw err;
	console.log('Connected to MySQL!');
	con.query("DROP DATABASE IF EXISTS library", function(err, result) {
		if(err) throw err;
		console.log("Previous DB destroyed")
	});
	con.query("CREATE DATABASE IF NOT EXISTS library", function(err, result) {
		if(err) throw err;
		console.log("DB created")
	});

	con.changeUser({ database : 'library' }, function(err) {
		if (err) throw err;
	});

	let createTables = `CREATE TABLE PERSON (
		PID		INTEGER	NOT NULL	AUTO_INCREMENT,
		PNAME	VARCHAR(15),
		PRIMARY KEY(PID)
	);
	CREATE TABLE PUBLISHER (
		PUBLISHERID	INTEGER	NOT NULL	AUTO_INCREMENT,
		PUBNAME		VARCHAR(15),
		ADDRESS		VARCHAR(20),
		PRIMARY KEY(PUBLISHERID)
	);
	CREATE TABLE DOCUMENT (
		DOCID		INTEGER	NOT NULL	AUTO_INCREMENT,
		TITLE			VARCHAR(20),
		PDATE		DATE,
		PUBLISHERID	INTEGER,
		PRIMARY KEY(DOCID),
		FOREIGN KEY(PUBLISHERID) REFERENCES PUBLISHER(PUBLISHERID) ON DELETE SET NULL
	);
	CREATE TABLE BOOK (
		DOCID	INTEGER	NOT NULL,
		ISBN		VARCHAR(13),
		PRIMARY KEY(DOCID),
		FOREIGN KEY(DOCID) REFERENCES DOCUMENT(DOCID) ON DELETE CASCADE
	);
	CREATE TABLE AUTHORS (
		PID		INTEGER	NOT NULL,
		DOCID	INTEGER	NOT NULL,
		PRIMARY KEY(PID, DOCID),
		FOREIGN KEY(DOCID) REFERENCES BOOK(DOCID) ON DELETE CASCADE,
		FOREIGN KEY(PID) REFERENCES PERSON(PID) ON DELETE CASCADE
	);
	CREATE TABLE JOURNAL_VOLUME (
		DOCID		INTEGER	NOT NULL,
		VOLUME_NO	INTEGER,
		EDITOR		INTEGER,
		PRIMARY KEY(DOCID),
		FOREIGN KEY(DOCID) REFERENCES DOCUMENT(DOCID) ON DELETE CASCADE,
		FOREIGN KEY(EDITOR) REFERENCES PERSON(PID) ON DELETE CASCADE
	);
	CREATE TABLE JOURNAL_ISSUE (
		DOCID		INTEGER	NOT NULL,
		ISSUE_NO		INTEGER	NOT NULL,
		SCOPE		VARCHAR(128),
		PRIMARY KEY(DOCID, ISSUE_NO),
		FOREIGN KEY(DOCID) REFERENCES JOURNAL_VOLUME(DOCID) ON DELETE CASCADE
	);
	CREATE TABLE GEDITS (
		DOCID		INTEGER	NOT NULL,
		ISSUE_NO		INTEGER	NOT NULL,
		PID			INTEGER	NOT NULL,
		PRIMARY KEY(DOCID, ISSUE_NO, PID),
		FOREIGN KEY(DOCID, ISSUE_NO) REFERENCES JOURNAL_ISSUE(DOCID, ISSUE_NO) ON DELETE CASCADE,
		FOREIGN KEY(PID) REFERENCES PERSON(PID) ON DELETE CASCADE
	);
	CREATE TABLE PROCEEDINGS (
		DOCID		INTEGER	NOT NULL,
		CDATE		DATE,
		CLOCATION		VARCHAR(20),
		CEDITOR		VARCHAR(20),
		PRIMARY KEY(DOCID),
		FOREIGN KEY(DOCID) REFERENCES DOCUMENT(DOCID) ON DELETE CASCADE
	);
	CREATE TABLE CHAIRS (
		PID		INTEGER	NOT NULL,
		DOCID	INTEGER	NOT NULL,
		PRIMARY KEY(PID, DOCID),
		FOREIGN KEY(DOCID) REFERENCES PROCEEDINGS(DOCID) ON DELETE CASCADE,
		FOREIGN KEY(PID) REFERENCES PERSON(PID) ON DELETE CASCADE
	);
	CREATE TABLE BRANCH (
		BID		INTEGER	NOT NULL	AUTO_INCREMENT,
		LNAME	VARCHAR(20),
		ADDRESS	VARCHAR(20),
		PRIMARY KEY(BID)
	);
	CREATE TABLE COPY (
		DOCID	INTEGER	NOT NULL,
		COPYNO	INTEGER	NOT NULL,
		BID		INTEGER	NOT NULL,
		POSITION	VARCHAR(9),
		PRIMARY KEY(DOCID, COPYNO, BID),
		FOREIGN KEY(DOCID) REFERENCES DOCUMENT(DOCID) ON DELETE CASCADE,
		FOREIGN KEY(BID) REFERENCES BRANCH(BID) ON DELETE CASCADE
	);
	CREATE TABLE READER (
		RID		INTEGER	NOT NULL	AUTO_INCREMENT,
		RTYPE	VARCHAR(20),
		RNAME	VARCHAR(20),
		RADDRESS	VARCHAR(20),
		PHONE_NO	CHAR(10),
		PRIMARY KEY(RID)
	);
	CREATE TABLE BORROWING (
		BOR_NO	INTEGER	NOT NULL	AUTO_INCREMENT,
		BDTIME	DATETIME,
		RDTIME	DATETIME,
		PRIMARY KEY(BOR_NO)
	);
	CREATE TABLE BORROWS (
		BOR_NO	INTEGER	NOT NULL,
		DOCID	INTEGER	NOT NULL,
		COPYNO	INTEGER	NOT NULL,
		BID		INTEGER	NOT NULL,
		RID		INTEGER,
		PRIMARY KEY(BOR_NO, DOCID, COPYNO, BID),
		FOREIGN KEY(BOR_NO) REFERENCES BORROWING(BOR_NO) ON DELETE CASCADE,
		FOREIGN KEY(RID) REFERENCES READER(RID) ON DELETE CASCADE,
		FOREIGN KEY(DOCID, COPYNO, BID) REFERENCES COPY(DOCID, COPYNO, BID) ON DELETE CASCADE
	);
	CREATE TABLE RESERVATION (
		RES_NO	INTEGER	NOT NULL	AUTO_INCREMENT,
		DTIME	DATETIME,
		PRIMARY KEY(RES_NO)
	);
	CREATE TABLE RESERVES (
		RID			INTEGER,
		RESERVATION_NO	INTEGER	NOT NULL,
		DOCID		INTEGER	NOT NULL,
		COPYNO		INTEGER	NOT NULL,
		BID			INTEGER	NOT NULL,
		PRIMARY KEY(RESERVATION_NO, DOCID, COPYNO, BID),
		FOREIGN KEY(RESERVATION_NO) REFERENCES RESERVATION(RES_NO) ON DELETE CASCADE,
		FOREIGN KEY(RID) REFERENCES READER(RID) ON DELETE CASCADE,
		FOREIGN KEY(DOCID, COPYNO, BID) REFERENCES COPY(DOCID, COPYNO, BID) ON DELETE CASCADE
	);`
	con.query(createTables,  function(err, result) {
		if(err) throw err;
		console.log("Tables created")
	});

	let fillTables = `INSERT INTO PERSON(PID, PNAME)
	VALUES (1, 'Joslyn'), (2, 'Courtney'), (3, 'Jeremy'), (4, 'Lola');
	
	INSERT INTO PUBLISHER(PUBLISHERID, PUBNAME, ADDRESS)
	VALUES (1, 'Penguin', '123 Lake Ave'), (2, 'Apple', '75 Cool Street');
	
	INSERT INTO DOCUMENT (DOCID, TITLE, PDATE, PUBLISHERID)
	VALUES (1, 'Blue Ruin', '2013-05-17', 1), (2, 'Green Room', '2015-05-17', 2), (3, 'A Journal', '1985-05-19', 1), (4, 'Not A Journal', '1984-04-21', 2), (5, 'Proc1', '2020-04-05', 2), (6, 'Proc2', '2021-05-06', 1);
	
	INSERT INTO BOOK(DOCID, ISBN)
	VALUES (1, '9781433202445'), (2, '9781433202476');
	
	INSERT INTO AUTHORS(PID, DOCID)
	VALUES (3, 1), (2, 2);
	
	INSERT INTO JOURNAL_VOLUME(DOCID, VOLUME_NO, EDITOR)
	VALUES (3, 1, 1), (4, 1, 2);
	
	INSERT INTO JOURNAL_ISSUE(DOCID, ISSUE_NO, SCOPE)
	VALUES (3, 10, 'Things written about in journals'), (4, 6, 'Things not written about in journals');
	
	INSERT INTO GEDITS(DOCID, ISSUE_NO, PID)
	VALUES (3, 10, 3), (4, 6, 4);
	
	INSERT INTO PROCEEDINGS(DOCID, CDATE, CLOCATION, CEDITOR)
	VALUES (5, '2020-04-04', 'New York', 'The Judge'), (6, '2021-05-05', 'Los Angeles', 'The Judge');
	
	INSERT INTO CHAIRS(PID, DOCID)
	VALUES (1, 5), (4, 6);
	
	INSERT INTO BRANCH(BID, LNAME, ADDRESS)
	VALUES(1, 'Monmouth', '321 Street Road'), (2, 'Holmdel', '123 Road Street');
	
	INSERT INTO COPY(DOCID, COPYNO, BID, POSITION)
	VALUES (1, 1, 1, '577.639'), (2, 1, 1, '324.623'), (4, 1, 2, '862.998'), (6, 1, 2, '455.012'), (1, 2, 1, '522.321');
	
	INSERT INTO READER(RID, RTYPE, RNAME, RADDRESS, PHONE_NO)
	VALUES (1, 'Adult', 'Louisiana', '2 Avenue Road', '1112223344'), (2, 'Youth', 'Blair', '7 Road Avenue', '1231231234'), (3, 'Senior', 'Chad', '9 Cool Street', '9998887777'), (4, 'Youth', 'Alaska', '8 Cool Road', '1112223333');
	
	INSERT INTO BORROWING(BOR_NO, BDTIME, RDTIME)
	VALUES (1, '2021-04-20 04:29:50', '2021-05-05 12:36:41'), (2, '2020-12-20 11:05:01', NULL);
	
	INSERT INTO BORROWS(BOR_NO, DOCID, COPYNO, BID, RID)
	VALUES (1, 1, 1, 1, 1), (2, 6, 1, 2, 2);
	
	INSERT INTO RESERVATION(RES_NO, DTIME)
	VALUES (1, '2021-04-18 03:28:27'), (2, '2021-04-17 06:00:00');
	
	INSERT INTO RESERVES(RID, RESERVATION_NO, DOCID, COPYNO, BID)
	VALUES (3, 1, 4, 1, 2), (4, 2, 6, 1, 2)	
	`
	con.query(fillTables,  function(err, result) {
		if(err) throw err;
		console.log("Tables filled")
	});
	
});
