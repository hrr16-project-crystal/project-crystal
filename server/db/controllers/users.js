'use strict';

var sql = require('../sql').users;

module.exports = rep => {

  return {

    // Creates the table;
    create: () => rep.none(sql.create),

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
    add: newUser =>
      rep.one(sql.add, newUser)
      // RF so that sql.add does the 3 table join. 
      .then(addedCoupleUser => rep.one(sql.findById, addedCoupleUser.user_id)),

    addSecondUser: secondUser =>
      rep.one(sql.addSecondUser, secondUser),

    // Tries to delete a user by id, and returns the number of records deleted;
    remove: id =>
      rep.result('DELETE FROM Users WHERE id = $1', id, r => r.rowCount),

    // Tries to find a user from id;
    findById: id =>
      rep.oneOrNone(sql.findById, id, user =>
        user),

    // findByEmail: email =>
    //   rep.oneOrNone(sql.findByEmail, email, user =>
    //     user),

    // RF: Needs to be able to handle case insensitive email requests.... !!!!!!!!!!!
    // citext? 
    // Check if user exists using email and return boolean true/false
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
      rep.one('SELECT count(*) FROM Users', [], data => parseInt(data.count))
  };
};
