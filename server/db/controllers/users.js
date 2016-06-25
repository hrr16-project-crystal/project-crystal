'use strict';

var sql = require('../sql').users;

module.exports = rep => {

  return {

    // Creates the table;
    create: () =>
      rep.none(sql.create),

    // Initializes the table with some user records, and returns each user
    init: () =>
      rep.tx('Demo-Users', t =>
        t.map(sql.init, null, row =>
          row)),

    // Drops the table;
    drop: () =>
      rep.none(sql.drop),

    // Removes all records from the table;
    empty: () =>
      rep.none(sql.empty),

    // Adds a new user to Users, Couples and Couples_Users table, and returns all User information
    add: newUser => {
      console.log('adding new user ....');
      return rep.one(sql.add, newUser)
        .then(result => {
          console.log('adding new user, successful!');
          return result;
        })
        .catch(err => {
          console.log('adding new user, but erred...'); 
          console.log(err);
          return err; 
        });
    },
    // RF so that sql.add does the 3 table join. 
    // .then(addedCoupleUser => rep.one(sql.findById, addedCoupleUser.user_id)),

    addSecondUser: secondUser =>
      rep.one(sql.addSecondUser, secondUser),

    // Tries to delete a user by id, and returns the number of records deleted;
    removeById: id =>
      rep.one(sql.removeById, id),

    // Tries to find a user from id;
    findById: id =>
      rep.oneOrNone(sql.findById, id, user =>
        user),

    // Check if user exists by email and return boolean true/false
    checkIfExists: email =>
      rep.oneOrNone(sql.findByEmail, email, user => {
        if (user !== null) {
          return true;
        }
        return false;
      }),

    // Returns all user records;
    all: () =>
      rep.any(sql.all),

    // Returns the total number of users;
    total: () =>
      rep.one('SELECT count(*) FROM Users', [], data => parseInt(data.count)),
  };
};
