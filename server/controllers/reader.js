// test this first route by sending a GET requets to 
// http://{host}:9922/reader/search
module.exports.searchDoc = async (req, res) => {
	res.send({ message: 'test' });
}

module.exports.checkoutDoc = async (req, res) => {
	res.end();
}

module.exports.returnDoc = async (req, res) => {
	res.end();
}

module.exports.reserveDoc = async (req, res) => {
	res.end();
}

module.exports.computeFine = async (req, res) => {
	res.end();
}

module.exports.getReserveDocs = async (req, res) => {
	res.end();
}

module.exports.getPublisherDocs = async (req, res) => {
	res.end();
}
