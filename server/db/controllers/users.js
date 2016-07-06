'use strict';
const helpers = require(__dirname + '/../../helpers/helpers');
const sql = require('../sql').users;
// namespaced below differently because currently only importing module for removeById operation.
// if additional operations begin to use module, standarize namespacing convention for sql files. 
const sqlCouples = require('../sql').couples;
const merge = require('lodash/merge');

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

    // Add access and refresh token to the User
    addToken: tokens => {
      console.log('IN USERS CONTROLLERS-------');
      console.log(tokens);
      return rep.one(sql.addToken, tokens)
      .then(data => {
        console.log(data);
        return data;
      });
    },

    // Adds a new User using passed in data from newUser object
    addFirstUser: newUser =>
      rep.one(sql.addFirstUser, newUser),

    // Adds a new User to an existing couple using passed in data from secondUser object
    // RF: rename updateExistingCouple SQL QueryFile to describe exactly what it updates/will Return.
    addSecondUser: secondUser =>
      rep.oneOrNone(sql.updateExistingCouple, secondUser.other_user_email)
      .then(updatedExistingCouple => {
        if (updatedExistingCouple) {
          const secondUserWithCoupleId = merge({}, secondUser, { couple_id: updatedExistingCouple.couple_id });
          // secondUser.couple_id = updatedExistingCouple.couple_id;
          return rep.one(sql.addSecondUser, secondUserWithCoupleId);
        }
        return null;
      }),

    // RF: Remove nesting from Promises, reduce to single level Promise chain
    // PRF: Remove modularity of SQL queries or connect under single task/transaction using pg-promise inbuilt methods
    // Delete a user by user ID and return the successfully deleted User's record
    removeById: userIdToDelete =>
      rep.oneOrNone(sql.checkIfBothUsersHaveJoined, userIdToDelete)
      .then(bothUsersHaveJoined => {
        if (bothUsersHaveJoined) {
          return rep.one(sql.setBothUsersHaveJoinedToFalse, bothUsersHaveJoined.couple_id)
            .then(updatedCouple => {
              return rep.one(sql.removeById, userIdToDelete);
            });
        }
        return rep.one(sqlCouples.removeByUserId, userIdToDelete);
      }),

    // Find and return user by user ID
    findById: id => {
      return rep.oneOrNone(sql.findById, [id], user => {
        return user;
      });
    },

    findByEmail: email =>
      rep.oneOrNone(sql.findByEmail, email),

    // Check if user exists by email or ID and return boolean true/false
    checkIfExists: emailOrId => {
      if (helpers.checkIfEmail(emailOrId)) {
        return rep.oneOrNone(sql.findByEmail, emailOrId, user => {
          if (user !== null) {
            return true;
          }
          return false;
        });
      }
      // else assume emailOrId is an ID
      return rep.oneOrNone(sql.findById, emailOrId, user => {
        if (user !== null) {
          return true;
        }
        return false;
      });
    },

    //Alter LoveBucks balance
    updateBucks: (points,partner) => 
      rep.one(sql.updateBucks, [points, partner], user => 
        user),

    // Returns all user records;
    all: () =>
      rep.any(sql.all),

    // Returns the total number of users;
    total: () =>
      rep.one('SELECT count(*) FROM Users', [], data => parseInt(data.count)),
  };
};
