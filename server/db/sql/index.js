'use strict';

const QueryFile = require('pg-promise').QueryFile;

// Helper for linking to external query files;
const sql = (file) => {                         

    var path = './db/sql/' + file;

    var options = {

        // minifying the SQL is always advised;
        // see also option 'compress' in the API;
        minify: true,

        // Showing how to use static pre-formatting parameters -
        // we have variable 'schema' in each SQL (as an example);
        params: {
            schema: 'public' // replaces ${schema~} with "public"
        }
    };

    return new QueryFile(path, options);
    // See QueryFile API:
    // http://vitaly-t.github.io/pg-promise/QueryFile.html
}

module.exports = {
    users: {
        create: sql('users/create.sql'),
        empty: sql('users/empty.sql'),
        init: sql('users/init.sql'),
        drop: sql('users/drop.sql'),
        add: sql('users/add.sql'),
        all: sql('users/all.sql'),
        findById: sql('users/findById.sql')
    },
    // products: {
    //     create: sql('products/create.sql'),
    //     empty: sql('products/empty.sql'),
    //     drop: sql('products/drop.sql'),
    //     add: sql('products/add.sql')
    // }
};
