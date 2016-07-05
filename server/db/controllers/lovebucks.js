'use strict';

let sql = require('../sql').lovebucks;
let couplesSql = require('../sql').couples;
let usersSql = require('../sql').users;

module.exports = rep => {
  return {
    // create lovebucks table
    create: () =>
      rep.none(sql.create),

    // add a new lovebucks transaction
    add: newGift =>
        rep.one(sql.add, newGift, transaction => transaction),

    // get all lovebucks transactions by couple id
    findByCoupleId: coupleId =>
      rep.any(sql.findByCoupleId, coupleId, history =>
        history),
  };
};
