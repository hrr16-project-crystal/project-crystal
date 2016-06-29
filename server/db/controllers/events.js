'use strict';

const sql = require('../sql').events;

module.exports = rep => {

  return {

    // Creates the table;
    create: () =>
      rep.none(sql.create),

    // Initializes the table with some event records.
    init: () =>
      rep.none(sql.init),

    // Drops the table;
    drop: () =>
      rep.none(sql.drop),

    // Removes all records from the table;
    empty: () =>
      rep.none(sql.empty),

    // Adds a new event, and returns the new event;
    add: eventObj =>
      rep.one(sql.add, eventObj),

    // Return all events for a particular couple
    findById: coupleID =>
      rep.any(sql.findById, coupleID, event =>
        event),

    // Tries to delete a event by id, and returns the number of records deleted;
    remove: eventID =>
      rep.oneOrNone(sql.remove, eventID),
  };
};
