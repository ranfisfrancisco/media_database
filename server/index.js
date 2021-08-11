require('dotenv').config();
const path = require('path');
const express = require('express');
const sessions = require('express-session');
// not necessary to set up ssl cert so using http
const http = require('http');
// not necessary to set up access control headers so using CORS mw
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const routes = require('./routes/routes');
const PORT = process.env.PORT;

app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized:true,
    cookie: { maxAge: 30 },
    resave: false
}));

app.use(express.urlencoded({ extended: false }));
// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));
app.use(express.json());
app.use(cors());

app.use('/api', routes);
// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}...`));
