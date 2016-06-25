'use strict';
const helpers = require(__dirname + '/../../helpers/helpers');
const sql = require('../sql').users;

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

    // Adds a new User using passed in data from newUser object
    addFirstUser: newUser =>
      rep.one(sql.addFirstUser, newUser),

    addSecondUser: secondUser =>
      rep.one(sql.addSecondUser, secondUser),

    // Tries to delete a user by id, and returns the number of records deleted;
    removeById: id =>
      rep.one(sql.removeById, id),

    // Find and return user by user ID
    findById: id =>
      rep.oneOrNone(sql.findById, id, user =>
        user),

    // Check if user exists by email or ID and return boolean true/false
    checkIfExists: emailOrId => {
      if (helpers.checkIfEmail(emailOrId)) {
        return rep.oneOrNone(sql.findByEmail, emailOrId, user => {
          if (user !== null) {
            return true;
          }
          return false;
        });
      } else {
        // assume emailOrId is an ID
        return rep.oneOrNone(sql.findById, emailOrId, user => {
          if (user !== null) {
            return true;
          }
          return false;
        });
      }
    },

    // Returns all user records;
    all: () =>
      rep.any(sql.all),

    // Returns the total number of users;
    total: () =>
      rep.one('SELECT count(*) FROM Users', [], data => parseInt(data.count)),
  };
};
