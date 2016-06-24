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

    // Adds a new user, and returns the new id;    //   SHOULD CHANGE TO WHOLE USER RETURN!
    add: newUserObj =>
      rep.one(sql.add, newUserObj, user =>
        user),

    // Adds a new user to Users, Couples and Couples_Users table, and returns all user information
    testAdd: newUser =>
      rep.one(sql.testAdd, newUser)
      // RF so that sql.testAdd does the 3 table join. 
      .then(addedCoupleUser => rep.one(sql.findById, addedCoupleUser.user_id)),

    testAddSecondUser: secondUser =>
      // find coupleId with otherUserEmail
      // add user to users table, add to EXISTING couple_user table
      // newUser.otherCoupleEmail
      {
        console.log("going through secondUser in db controller")
        return rep.one(sql.addSecondUser, secondUser)
          .then(result => {
            console.log('=== should now return WHOLE info for user! .. may add 2 couple id cols..');
            console.log(result);
            console.log('----------------------=========== ----------------');
            return result;
          })
          .catch(err => {
            console.log(err);
            return err;
          })
      },

    // Tries to delete a user by id, and returns the number of records deleted;
    remove: id =>
      rep.result('DELETE FROM Users WHERE id = $1', id, r => r.rowCount),

    // Tries to find a user from id;
    findById: id =>
      rep.oneOrNone(sql.findById, id, user =>
        user),

    findByEmail: email =>
      rep.oneOrNone(sql.findByEmail, email, user =>
        user),

    checkIfExists: email =>
      rep.oneOrNone(sql.findByEmail, email, user => {
        // const helpers = require(__dirname + '/../../helpers/helpers');
        // helpers.customLog(user);
        if (user !== null) {
          return true;
        }
        return false;
      }),

    // RF: 
    // update: (user_id, objWithUpdates, pgp) => {
    //   console.log('===================');
    //   const sqlUpdate = "UPDATE public.Users SET first_name=${first_name}, last_name=${last_name}, email=${email}, password=${password} WHERE user_id=${user_id} RETURNING *";
    //   const modSqlUpdate = pgp.as.format(sqlUpdate, objWithUpdates, { partial: true });
    //   return rep.one(modSqlUpdate, user =>
    //     user);
    // },

    // Returns all user records;
    all: () =>
      rep.any(sql.all),

    // Returns the total number of users;
    total: () =>
      rep.one('SELECT count(*) FROM Users', [], data => parseInt(data.count))
  };
};
