'use strict';

var sql = require('../sql').questions;

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

    // Tries to delete a user by id, and returns the number of records deleted;
    remove: id =>
      rep.result('DELETE FROM Users WHERE id = $1', id, r => r.rowCount),

    // Tries to find a user from id;
    findById: id =>
      rep.oneOrNone(sql.findById, id, user =>
        user),

    // update: (user_id, objWithUpdates, pgp) => 
    //     {
    //         console.log('===================');
    //         console.log(pgp.as.format(sql.update, objWithUpdates, {partial: true}));
    //              console.log('===================');
    //         return rep.one(pgp.as.format(sql.update, objWithUpdates, {partial: true}), user =>
    //         user);
    //     },

    // Returns all user records;
    all: () =>
      rep.any(sql.all),

    // Returns the total number of users;
    total: () =>
      rep.one('SELECT count(*) FROM Users', [], data => parseInt(data.count))
  };
};
