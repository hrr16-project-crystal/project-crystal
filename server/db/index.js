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
  messages: require('./controllers/messages'),
  todos: require('./controllers/todos'),
  lovebucks: require('./controllers/lovebucks'),
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
    obj.messages = controllers.messages(obj);
    obj.todos = controllers.todos(obj);
    obj.lovebucks = controllers.lovebucks(obj);
  },
};

//Database connection parameters:

// const config = {
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
// };

const config = {
  host: 'localhost',
  port: 5432,
  database: 'blossomly',
  // user: 'Roger',
  user: 'postgres',
};

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
