var express = require('express');
var bodyParser = require('body-parser');
var db = require('./db');
var app = express();
const React = require('react');
var port = process.env.PORT || 3000;
app.use(express.static(`${__dirname}/../client/build`));
app.use(bodyParser.json());
const path = require('path');

app.get('*', (req, res) => res.sendFile(path.join(`${__dirname}/../client/build/index.html`)));

// app.get('*', function (req, res){
//   res.sendFile(`${__dirname}/../client/build/index.html`);
// });

app.listen(port, () => console.log('Server running on port 3000!'));
module.exports = app;
