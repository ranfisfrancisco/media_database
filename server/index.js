require('dotenv').config()
const express = require('express');
// not necessary to set up ssl cert so using http
const http = require('http');
// not necessary to set up access control headers so using CORS mw
const cors = require('cors');

const app = express();
const server = http.createServer(app);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

const routes = require('./routes/routes');

app.use('/reader', routes);

// move to process.env.PORT if you'd like to in the future
console.log(`PORT ${process.env.port}`)
const PORT = process.env.PORT;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));