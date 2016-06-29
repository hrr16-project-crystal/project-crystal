'use strict';

var sql = require('../sql').couples_users;

module.exports = rep => {

  return {

    // Creates the table;
    create: () => rep.none(sql.create),

    // RF: the return array
    // Initializes the table with some couple/user combinations, return the combinations
    init: () =>
      rep.tx('Demo-Couple-User-Combos', t =>
        t.map(sql.init, null, coupleUser =>
          coupleUser)),

    // RF: return the couple information AND all users part of that couple
    // Adds a new couple-user combination and returns the couple-user combination
    add: (couple_id, user_id) =>
      rep.one(sql.add, [couple_id, user_id], coupleUser =>
        coupleUser),

    findByUserId: user_id =>
      // Possibly need to remove public (may not entire Schema name...)
      rep.one('SELECT * FROM public.couples_users WHERE public.couples_users.user_id = $1', user_id)
      .then(data => {
        return data;
      }),

      // Update and remove/delete are built into Schema/flow from db user or couple actions
      // as this is purely a junction table

  };
};
