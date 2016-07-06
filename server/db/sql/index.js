'use strict';
const QueryFile = require('pg-promise').QueryFile;

// Helper for linking to external query files;
const sql = (file) => {
  // var path = './db/sql/' + file;
  const path = __dirname + '/' + file;

  // RF: Remove two lines below
  // const helpers = require(__dirname + '/../../helpers/helpers');
  // helpers.customLog(path);

  const options = {
    // minifying the SQL is always advised;
    // see also option 'compress' in the API;
    minify: true,

    // using static pre-formatting parameters -
    // we have variable 'schema' in each SQL;
    params: {
      schema: 'public', // replaces ${schema~} with "public"
    },
  };

  return new QueryFile(path, options);
};

module.exports = {
  users: {
    create: sql('users/create.sql'),
    empty: sql('users/empty.sql'),
    init: sql('users/init.sql'),
    drop: sql('users/drop.sql'),
    all: sql('users/all.sql'),
    updateBucks: sql('users/updateBucks.sql'),
    findById: sql('users/findById.sql'),
    findByEmail: sql('users/findByEmail.sql'),
    addFirstUser: sql('users/addFirstUser.sql'),
    addToken: sql('users/addToken.sql'),
    addSecondUser: sql('users/addSecondUser.sql'),
    removeById: sql('users/removeById.sql'),
    updateExistingCouple: sql('users/updateExistingCouple.sql'),
    checkIfBothUsersHaveJoined: sql('users/checkIfBothUsersHaveJoined.sql'),
    setBothUsersHaveJoinedToFalse: sql('users/setBothUsersHaveJoinedToFalse.sql'),
  },
  couples: {
    create: sql('couples/create.sql'),
    init: sql('couples/init.sql'),
    add: sql('couples/add.sql'),
    all: sql('couples/all.sql'),
    findById: sql('couples/findById.sql'),
    removeById: sql('couples/removeById.sql'),
    updateScore: sql('couples/updateScore.sql'),
    removeByUserId: sql('couples/removeByUserId.sql'),
    getBothUsers: sql('couples/getBothUsers.sql'),
  },
  questions: {
    create: sql('questions/create.sql'),
    init: sql('questions/init.sql'),
    add: sql('questions/add.sql'),
    all: sql('questions/all.sql'),
    findByFrequency: sql('questions/findByFrequency.sql'),
    remove: sql('questions/remove.sql'),
  },
  events: {
    create: sql('events/create.sql'),
    init: sql('events/init.sql'),
    add: sql('events/add.sql'),
    drop: sql('events/drop.sql'),
    empty: sql('events/empty.sql'),
    findById: sql('events/findById.sql'),
    remove: sql('events/remove.sql'),
  },
  messages: {
    create: sql('messages/create.sql'),
    add: sql('messages/add.sql'),
    findByCoupleId: sql('messages/findByCoupleId.sql'),
  },
  todos: {
    create: sql('todos/create.sql'),
    init: sql('todos/init.sql'),
    add: sql('todos/add.sql'),
    drop: sql('todos/drop.sql'),
    empty: sql('todos/empty.sql'),
    findById: sql('todos/findById.sql'),
    remove: sql('todos/remove.sql'),
  },
  lovebucks: {
    create: sql('lovebucks/create.sql'),
    add: sql('lovebucks/add.sql'),
    findByCoupleId: sql('lovebucks/findByCoupleId.sql'),
  },
};
