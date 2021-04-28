const axios = require('axios');

module.exports = axios.create({
	baseURL: 'http://142.93.247.33:9922/reader',
});
