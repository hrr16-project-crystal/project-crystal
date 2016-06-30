'use strict';

const sql = require('../sql').todos;

module.exports = rep => {

  return {

    // Creates the table;
    create: () => 
      rep.none(sql.create),

    // Initializes the table with some question records.
    init: () => 
      rep.none(sql.init),

    // Drops the table;
    drop: () =>
      rep.none(sql.drop),

    // Removes all records from the table;
    empty: () =>
      rep.none(sql.empty),

    // Adds a new question, and returns the new question;
    add: newTodoObj =>
      rep.one(sql.add, newTodoObj, todo =>
        todo),

    // Return all questions, with qualifiers in an options object
    // defined on the API route
    all: (options) => {
      return ('nothing here yet!'); 
    },

    // Tries to delete a question by id, and returns the number of records deleted;
    remove: id =>
      rep.result('DELETE FROM questions WHERE id = $1', id, r => r.rowCount),

    // Tries to find questions by frequency;
    findByFrequency: frequency =>
      rep.any(sql.findByFrequency, frequency, questions =>
        questions)
  };
};
