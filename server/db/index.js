'use strict';
const promise = require('bluebird');

// Loading all the database repositories separately,
// because event 'extend' is called for every task and transaction
// executed, which should be as fast as possible.
const repos = {
    users: require('./repos/users'),
    // questions: require('./repos/questions'),
    // answers: require('./repos/answers'),
};

// pg-promise initialization options:
const options = {

    // Use bluebird promise library, instead of the default ES6 Promise:
    promiseLib: promise,

    // Extending the database protocol with our custom repositories:
    extend: obj => {
        obj.users = repos.users(obj);
        // obj.questions = repos.questions(obj);
        // obj.answers = repos.answers(obj); 
    }

};

// Database connection parameters:
const config = {
    host: 'localhost',
    port: 5432,
    database: 'blossomly',                         // CHANGED 
    user: 'Roger'
};

// Load and initialize pg-promise:
var pgp = require('pg-promise')(options);

// Create the database instance:
var db = pgp(config);

// // Load and initialize all the diagnostics:      // CHANGED
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
    db
};
