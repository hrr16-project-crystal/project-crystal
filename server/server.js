const express = require('express');
// const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
app.use(express.static(`${__dirname}/../client/build`));
// const path = require('path');

app.get('/', (req, res) => res.sendFile(path.join(`${__dirname}/../client/build/index.html`)));

// module.exports = app;
mongoose.connect('mongodb://localhost:auth/auth-server');

// Morgan is a logging framework (middleware) and helpful for debugging
app.use(morgan('combined'));
// Middleware that parses incoming requests into JSON no matter the type of request
app.use(bodyParser.json({ type: '*/*' }));
router(app);

// const server = http.createServer(app);
// server.listen(port);
app.listen(port, () => console.log(`Server listening on port: ${port}`));
// console.log(`Server listening on: ${port}`);
