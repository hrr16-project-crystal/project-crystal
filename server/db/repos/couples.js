'use strict';

const sql = require('../sql').couples;

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
    add: () => {
      return rep.one(sql.add);
      // return rep.task(t => {
      //     return t.one(sql.add)
      //     .then(couple => {
      //       console.log('couple.js in the repos....');
      //       console.log(couple);
      //       return t.any(sql.findById, couple.couple_id)
      //         .then(couples => {
      //           console.log('we are in repor/couple last then stmt');
      //           console.log(couples);
      //           return couples;
      //         });
      //     });
      //   });
        // .then()...
    },

    // Tries to delete a couple by id, and returns the deleted couple;
    remove: couple_id =>
      rep.oneOrNone(sql.remove, couple_id, couple => couple),

    // Finds a couple by id, returns array of users related to that couple
    findById: couple_id => {
      console.log("YAY IM IN FINDBYID COUPLES");
      console.log(couple_id);
      return rep.any(sql.findById, couple_id, couples => {
        console.log('COUPLE JS IN THE REPOS');
        console.log(couples);
        return couples;
      });
    },

    // Updates couple's health score
    // updateScore: (couple_id, score) =>
    //   rep.oneOrNone(sql.updateScore, [couple_id, score], couple =>
    //     couple),

    updateScore: (scoreObj, coupleId) => {
      // rep.oneOrNone(sql.updateScore, [coupleId, scoreObj], couple =>
      //   couple),
      console.log('couple.js in the repo ==========');
      console.log(coupleId);
      console.log('couple.js in the repo---fsdfsdfsdfd');
      console.log(scoreObj);

      // Grab current scores (can we use sql query to insert something and it will
      return rep.one(sql.updateScore, [
        coupleId, scoreObj.Total, scoreObj.Respect, scoreObj.Communication,
        scoreObj.Intimacy, scoreObj.Generosity, scoreObj.Spontaneity,
      ]);
      // existing value of the row -- as part of the writing operation)
      // Average them with new scores
      // Then, insert average into the table
    },

    // Returns all couple records;
    all: () =>
      rep.any(sql.all),

    // Returns the total number of couples;
    total: () =>
      rep.one('SELECT count(*) FROM Couples', [], data => parseInt(data.count))
  };
};
