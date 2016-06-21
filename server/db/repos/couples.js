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

    // Adds new couple with initial score, and returns the whole new couple
    add: score => {
      // return rep.one(sql.add, score, couple =>
      //   couple);
      return rep.task(t => {
          return t.one(sql.add, score)
            .then(couple => {
              console.log('======== what couple obj looks like! ============');
              console.log(couple.couple_id);
              console.log('====================='); 
              return t.any(sql.findById, couple.couple_id)
                .then( couples => couples)
            })
        })
        // .then()... 
    },

    // Tries to delete a couple by id, and returns the deleted couple;
    remove: couple_id =>
      rep.oneOrNone(sql.remove, couple_id, couple => couple),

    // Finds a couple by id, returns array of users related to that couple
    findById: couple_id => {
      return rep.any(sql.findById, couple_id, couples =>
        couples);
    },

    // Updates couple's health score
    updateScore: (couple_id, score) =>
      rep.oneOrNone(sql.updateScore, [couple_id, score], couple =>
        couple),

    // Returns all couple records;
    all: () =>
      rep.any(sql.all),

    // Returns the total number of couples;
    total: () =>
      rep.one('SELECT count(*) FROM Couples', [], data => parseInt(data.count))
  };
};
