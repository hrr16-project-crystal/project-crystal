'use strict';

var sql = require('../sql').couples;

module.exports = rep => {

  return {

    // Creates the table;
    create: () => rep.none(sql.create),

    // Initializes the table with some couple records, and returns each couple
    init: () =>
      rep.tx('Demo-Couples', t =>
        t.map(sql.init, null, couple =>
          couple)),

    // Adds a new couple by score, and returns the whole new couple
    add: score => {
      return rep.one(sql.add, score, couple =>
        couple);
    },

    // Tries to delete a couple by id, and returns the deleted couple;
    remove: couple_id =>
      rep.oneOrNone(sql.remove, couple_id, couple => couple),

    // Tries to find a couple from id;
    findById: couple_id =>
      rep.oneOrNone(sql.findById, couple_id, couple =>
        couple),

    // Updates couple's health score
    updateScore: (couple_id, score) =>
      rep.oneOrNone(sql.updateScore, ({couple_id, score}), couple =>
        couple),

    // Returns all couple records;
    all: () =>
      rep.any(sql.all),

    // Returns the total number of couples;
    total: () =>
      rep.one('SELECT count(*) FROM Couples', [], data => parseInt(data.count))
  };
};
