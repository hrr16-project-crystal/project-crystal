require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const db = require(__dirname + '/db/index').db;
const jwt = require('jwt-simple');
const Users = require(`${__dirname}/db/index`).db.users;
const helpers = require(`${__dirname}/helpers/helpers`);
const compression = require('compression');
const clientSecret = new Buffer(process.env.JWT_SECRET).toString();

const app = express();
const http = require('http').Server(app);
const socketServer = require('./socket');
const io = require('socket.io')(http);
const React = require('react');
const port = process.env.PORT || 9000;
// process.env.NODE_ENV = 'production';
app.use(compression());
app.use(express.static(`${__dirname}/../client/build`));
app.use(bodyParser.json());

const path = require('path');
const webpack = require('webpack');
const config = require('../webpack.config');
const compiler = webpack(config);
const router = require('./router');
const cors = require('cors');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');

// populate postgresql db | Not needed once initial database has been populated
// require('./db/populateDb')();

const userAPIroutes = require('./routes/api/user');
const coupleAPIroutes = require('./routes/api/couple');
const questionAPIroutes = require('./routes/api/questions');
const eventsAPIroutes = require('./routes/api/events');
const messageAPIroutes = require('./routes/api/message');
const todoAPIroutes = require('./routes/api/todos');
const dateNightAPIroutes = require('./routes/api/dateNight');
const lovebucksAPIroutes = require('./routes/api/lovebucks');

// *** API routes *** //
app.use('/api/v1', userAPIroutes);
app.use('/api/v1', coupleAPIroutes);
app.use('/api/v1', questionAPIroutes);
app.use('/api/v1', eventsAPIroutes);
app.use('/api/v1', messageAPIroutes);
app.use('/api/v1', todoAPIroutes);
app.use('/api/v1', dateNightAPIroutes);
app.use('/api/v1', lovebucksAPIroutes);

router(app);

// // *** error handlers *** //
// catch 404 and forward to error handler

// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// // development error handler
// // will print stacktrace
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.json('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.json('error', {
//     message: err.message,
//     error: {}
//   });
// });

module.exports = app;

if (app.get('env') === 'development') {
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use('/', express.static(path.resolve(__dirname, '../client/build')));
app.post('/verify', (req, res, next) => {
  const token = req.body.token;
  const decoded = jwt.decode(token, clientSecret);
  Users.findById(decoded.sub)
  .then(foundUser => {
    if (foundUser) {
      res.json({
        success: true,
        data: helpers.desensitize(foundUser),
      });
    }
  });
});

app.use('*', (req, res) => {
  res.redirect('/');
});

// Cors is a middleware that will handle CORS in the browser
app.use(cors());
// Middleware that parses incoming requests into JSON no matter the type of request
app.use(bodyParser.json({ type: '*/*' }));
router(app);

const webServer = app.listen(port, () => console.log(`Server started at: http://localhost:${port}`));

// // *** Socket.io *** //
socketServer(webServer);
