const express = require('express');
const bodyParser = require('body-parser');
const db = require(__dirname + '/db/index').db;

const app = express();
const React = require('react');
const port = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/../client/build`));
app.use(bodyParser.json());

const path = require('path');
const webpack = require('webpack');
const config = require('../webpack.config');
const compiler = webpack(config);
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');

// populate postgresql db
require('./db/populateDb')();

const userAPIroutes = require('./routes/api/user');
const coupleAPIroutes = require('./routes/api/couple'); 
const questionAPIroutes = require('./routes/api/questions'); 

// // *** API routes *** //
app.use('/api/v1', userAPIroutes);
app.use('/api/v1', coupleAPIroutes);
app.use('/api/v1', questionAPIroutes);

// // *** error handlers *** //
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.get('*', (req, res) => res.sendFile(path.join(`${__dirname}/../client/build/index.html`)));

app.listen(port, () => console.log('Server running on port 3000!'));

module.exports = app;

if (app.get('env') === 'development') {
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
}
app.use('/', express.static(path.resolve(__dirname, '../client/build')));

mongoose.connect('mongodb://localhost:auth/auth-server');

// Cors is a middleware that will handle CORS in the browser
app.use(cors());
// Middleware that parses incoming requests into JSON no matter the type of request
app.use(bodyParser.json({ type: '*/*' }));
router(app);

app.listen(port, () => console.log(`Server started at: http://localhost:${port}`));
