const axios = require('axios');

module.exports = axios.create({
	baseURL: 'localhost:3000',
});
