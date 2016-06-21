const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const app = express();
const path = require('path');
const webpack = require('webpack');
const config = require('../webpack.config');
const compiler = webpack(config);
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevMiddleware = require('webpack-dev-middleware');

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
// app.use('/*', function (req, res) {
//   res.redirect('/');
// });

app.listen(port, () => console.log(`Server started at: http://localhost:${port}`));
