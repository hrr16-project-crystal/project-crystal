'use strict';

const sql = require('../sql').todos;

module.exports = rep => {

  return {

    // Creates the table;
    create: () => 
      rep.none(sql.create),

    // Initializes the table with some todo records.
    init: () => 
      rep.none(sql.init),

    // Drops the table;
    drop: () =>
      rep.none(sql.drop),

    // Removes all records from the table;
    empty: () =>
      rep.none(sql.empty),

    // Adds a new todo, and returns the new todo;
    add: newTodoObj =>
      rep.one(sql.add, newTodoObj, todo => todo),
    
    // Return all todos for a particular couple
    findById: coupleID =>
      rep.any(sql.findById, coupleID, todo => todo),

    // Delete a event by id
    remove: todoID =>
      rep.oneOrNone(sql.remove, todoID),
  };
};
