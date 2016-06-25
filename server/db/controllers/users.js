'use strict';
const helpers = require(__dirname + '/../../helpers/helpers');
const sql = require('../sql').users;
// namespace differently because currently only importing module for removeById operation.
// if additional operations begin to use module, standarize namespacing convention for sql files. 
const sqlCouples = require('../sql').couples;

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

    // Adds a new User to an existing couple using passed in data from secondUser object 
    addSecondUser: secondUser => {
      return rep.oneOrNone(sql.updateExistingCouple, secondUser.other_user_email)
        .then(updatedExistingCouple => {
          // Existing couple will only have it's have_both_users_joined flag updated if
          // it was previously set to false
          if (updatedExistingCouple) {
            secondUser['couple_id'] = updatedExistingCouple.couple_id;
            return rep.one(sql.addSecondUser, secondUser);
          }
          return null;
        });
    },

    // RF: Remove nesting from Promises, reduce to single level Promise chain
    // PRF: Remove modularity of SQL queries or connect under single task/transaction using pg-promise inbuilt methods
    // Delete a user by user ID and return the successfully deleted User's record
    removeById: userIdToDelete => {
      // first find the user's corresponding couple id and confirm whether they are the last existing user in the couple or not by reference to the have_both_users_joined flag column
      return rep.oneOrNone(sql.checkIfBothUsersHaveJoined, userIdToDelete)
        .then(bothUsersHaveJoined => {
          // if true, no user of the Couple has yet requested deletion. Manually set flag to false
          // then proceed with User record deletion.
          // NOTE: bothUsersHaveJoined is actually a reference to Couple record returned where flag is true. 
          if (bothUsersHaveJoined) {
            return rep.one(sql.setBothUsersHaveJoinedToFalse, bothUsersHaveJoined.couple_id)
              .then(updatedCouple => {
                return rep.one(sql.removeById, userIdToDelete);
              });
            // else if not true, only one user is related to the existing Couple. So proceed to delete
            // the Couple record. Related User record(s) will be deleted in cascade.
            // removeByUserId as opposed to removeById returns Couple and single User record joined
          } 
          return rep.one(sqlCouples.removeByUserId, userIdToDelete);
        });
    },

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

    // checkIfBothUsersHaveJoined: (userRequestingDeletion) =>
    //   rep.oneOrNone(sql.checkIfBothUsersHaveJoined, userRequestingDeletion),

    // Returns all user records;
    all: () =>
      rep.any(sql.all),

    // Returns the total number of users;
    total: () =>
      rep.one('SELECT count(*) FROM Users', [], data => parseInt(data.count)),
  };
};
