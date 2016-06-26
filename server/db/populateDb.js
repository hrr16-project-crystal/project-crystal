const db = require(__dirname + '/index').db;

const populateDb = () => {
  db.query('DROP TABLE IF EXISTS Couples, Users, Questions')
    .then(db.couples.create)
    .then(db.users.create)
    .then(db.questions.create)
    .then(db.questions.init)
    .then(result => console.log('Db successfully restarted!'))
    .catch(err => console.log('End of db creation, issue: ' + err));
};

module.exports = populateDb;
