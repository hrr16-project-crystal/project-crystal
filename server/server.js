const express = require('express');
const bodyParser = require('body-parser');
const db = require(__dirname + '/db/index').db;

// // before app exp? 
// const userAPIroutes = require('./routes/api/user');

const app = express();
const React = require('react');
const port = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/../client/build`));
app.use(bodyParser.json());

const path = require('path');

// populate postgresql db
require('./db/populateDb')();

const userAPIroutes = require('./routes/api/user');
const coupleAPIroutes = require('./routes/api/couple'); 

app.use('/api/v1', userAPIroutes);
app.use('/api/v1', coupleAPIroutes);
// app.use('api/v1', questionAPIroutes);



// // *** error handlers *** //

// // catch 404 and forward to error handler
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
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }

// // production error handler
// // no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


// // only intialise router routes once db is initialised! //.. but can refactor this in later instance.. 
// app.post('/users/add', (req, res) => {
//   console.log('POST request reached my server yay!');

//   const newUserObj = req.body;

//   db.users.add(newUserObj)
//     .then(data => {
//       res.json({
//         success: true,
//         data
//       });
//     })
//     .catch(err => {
//       res.json({
//         success: false,
//         error: err.message || err
//       });
//     });
// });


app.get('*', (req, res) => res.sendFile(path.join(`${__dirname}/../client/build/index.html`)));

app.listen(port, () => console.log('Server running on port 3000!'));

module.exports = app;
