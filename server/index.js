const express = require('express');
// not necessary to set up ssl cert so using http
const http = require('http');
// not necessary to set up access control headers so using CORS mw
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const server = http.createServer(app);

require('./database/initDb');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const ReaderRoutes = require('./routes/reader-routes');
const AdminRoutes = require('./routes/admin-routes');

app.use('/reader', ReaderRoutes);
app.use('/admin', AdminRoutes);

// move to process.env.PORT if you'd like to in the future
const PORT = 9922;
server.listen(PORT);
