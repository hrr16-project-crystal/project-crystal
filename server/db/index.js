'use strict';
const promise = require('bluebird');

// Loading all the database controllersitories separately,
// because event 'extend' is called for every task and transaction
// executed, which should be as fast as possible.
const controllers = {
  users: require('./controllers/users'),
  questions: require('./controllers/questions'),
  couples: require('./controllers/couples'),
  events: require('./controllers/events'),
};

// pg-promise initialization options:
const options = {

  // Use bluebird promise library, instead of the default ES6 Promise:
  promiseLib: promise,

    // Extending the database protocol with our custom controllers:
  extend: obj => {
    obj.users = controllers.users(obj);
    obj.questions = controllers.questions(obj);
    obj.couples = controllers.couples(obj);
    obj.events = controllers.events(obj);
  },
};

// Database connection parameters:
const config = {
  host: 'ec2-50-112-35-113.us-west-2.compute.amazonaws.com',
  port: 5432,
  database: 'blossomly',
  user: 'postgres',
  password: 'hottub',
};
// const config = {
//   host: 'ec2-50-112-35-113.us-west-2.compute.amazonaws.com',
//   port: 5432,
//   database: 'blossomly',
//   user: 'other_user',
//   password: 'hottub',
// };

// Load and initialize pg-promise:
const pgp = require('pg-promise')(options);

// Create the database instance:
const db = pgp(config);

// // Load and initialize all the diagnostics:
// var diag = require('./diagnostics');
// diag.init(options);

// Alter default pool size here, using exposed instance of node-postgres library
pgp.pg.defaults.poolSize = 10;

module.exports = {

  // Library instance is often necessary to access all the useful
  // types and namespaces available within the library's root:
  pgp,

  // Database instance. Only one instance per database is needed
  // within any application.
  db,
};
