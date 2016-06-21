const db = require(__dirname + '/index').db;

const populateDb = () => {
  db.users.create()
    .then(() => console.log('DB successfully initialized!'))
    .catch(err => console.log('Error in DB initialization/population', err))
    .then(db.users.init)
    .then(users => console.log('DB successfully populated with demo users: ', users))
    .then(db.couples.create)
    .then(db.couples.init)
    .then(couples => console.log("DB successfully populated with couples: ", couples))
    .catch(err => console.log(err))
    .then(db.couples_users.create)
    .then(db.couples_users.init)
    .then(coupleUsers => console.log('DB successfully created junction couples_users table', coupleUsers))
    .catch(err => console.log(err))
    .then(db.questions.create)
    .then(db.questions.init)
    .then(() => console.log("DB successfully populated with questions: "))
    .catch(err => console.log(err));
};

module.exports = populateDb; 
