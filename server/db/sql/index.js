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
            schema: 'public' // replaces ${schema~} with "public"
        }
    };

    return new QueryFile(path, options);
}

module.exports = {
    users: {
        create: sql('users/create.sql'),
        empty: sql('users/empty.sql'),
        init: sql('users/init.sql'),
        drop: sql('users/drop.sql'),
        all: sql('users/all.sql'),
        findById: sql('users/findById.sql'),
        findByEmail: sql('users/findByEmail.sql'),
        addFirstUser: sql('users/addFirstUser.sql'), 
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
    },  
    questions: {
        create: sql('questions/create.sql'),
        init: sql('questions/init.sql'),
        add: sql('questions/add.sql'),
        all: sql('questions/all.sql'),
        findByFrequency: sql('questions/findByFrequency.sql'),
        remove: sql('questions/remove.sql'),
    }
};
