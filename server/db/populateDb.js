const db = require(__dirname + '/index').db;

const populateDb = () => {
  db.couples.create()
    .then(db.users.create)
    .then(db.questions.create)
    .then(db.questions.init)
    .catch(err => console.log('End of db creation, issue: ' + err));
};

module.exports = populateDb; 
