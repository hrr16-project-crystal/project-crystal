const db = require(__dirname + '/index').db;

const populateDb = () => {
  db.users.create()
    .then(() => console.log('DB successfully initialized!'))
    .catch(err => console.log('Error in DB initialization/population', err))
    .then(db.users.init)
    .then(users => console.log('DB successfully populated with demo users: ', users));
};

module.exports = populateDb; 
