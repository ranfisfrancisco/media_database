const axios = require('axios');

module.exports = axios.create({
	baseURL: "https://my-media-database.herokuapp.com/api",
});
