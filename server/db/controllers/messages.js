'use strict';

let sql = require('../sql').messages;

module.exports = rep => {

  return {
    // create messages table
    create: () =>
      rep.none(sql.create),

    // add a new message
    add: newMessage =>
      rep.one(sql.add, newMessage),
      
    // get all couples messages
    findByCoupleId: coupleId =>
      rep.any(sql.findByCoupleId, coupleId)
  };
};
