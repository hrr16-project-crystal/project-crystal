const jwt = require('jwt-simple');
const config = require('../config');
const Users = require(__dirname + '/../db/index').db.users;
const Couples = require(__dirname + '/../db/index').db.couples;
const CouplesUsers = require(__dirname + '/../db/index').db.couples_users;
const Events = require(__dirname + '/../db/index').db.events;
const pgp = require(__dirname + '/../db/index').pgp;
const bcrypt = require('bcrypt-nodejs');
const helpers = require(__dirname + '/../helpers/helpers');

const tokenForUser = user => {
  console.log('tokenFORuser')
  console.log(user)
  // First argument is what to encode and the second is the secret to use
  // Sub is short for Subject and it is the convention used for JWT
  // iat is short for Issued at Time and is another convention used for JWT
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.user_id, iat: timestamp, couple_id: user.couple_id }, config.jwtSecret);
};

exports.signin = (req, res, next) => {
  console.log('==== IN auth controller server===');
  // User has already had their email and password auth'd ,just need to give them a token
  // req.user.coupleID = 35;
  console.log(req.body);
  console.log('000000000000000')
  console.log(req.user)
  console.log('000000000000000')
  res.send({
    token: tokenForUser(req.user),
    data: req.user,
  });
};

exports.signup = (req, res, next) => {
  console.log('We are in the signup route...');
  let newUser = {};
  newUser.first_name = req.body.firstName;
  newUser.last_name = req.body.lastName;
  newUser.email = req.body.email;
  newUser.password = req.body.password;
  if (req.body.couple === 'yes') {
    newUser.is_first_of_couple = true;
  } else {
    newUser.is_first_of_couple = false;
    newUser.other_user_email = req.body.otherEmail;
  }

  // defaultEvent = {
  //   title: 'Welcome!',
  //   description: 'This is the default event for our calendar!',
  //   start_date: '2016-06-30T06:00:00.000Z',
  //   end_date: '2016-06-30T15:00:00.000Z',
  //   category: 'Misc',
  // };

  console.log('===========');
  console.log(newUser);
  Users.checkIfExists(newUser.email)
    .then(exists => {
      console.log('IN THE checkIFEXISTIS')
      console.log(exists)
      if (exists) {
        res.status(422)
          .json({
            success: false,
            data: 'Email ' + newUser.email + ' is already is use!',
          });
      } else {
        helpers.hashPassword(newUser.password)
          .then(hash => {
            console.log('=====IN HASPASS=====')
            console.log(hash)
            newUser.password = hash;
            // RF: Unify under a single addUser method, move logic to DB controllers
            // Don't need to expose this logic in routes. newUser when passed will include is_first_of_couple flag.
            if (newUser.is_first_of_couple) {
              console.log('STOPS IN THE IF STMT')
              Users.addFirstUser(newUser)
                .then(addedUser => {
                  console.log('===== AddFirstUser=====')
                  console.log(addedUser)
                  res.status(200)
                    .json({
                      success: true,
                      data: helpers.desensitize(addedUser),
                    });
                });
            } else {
              console.log('IN THE ELSE STMT')
              Users.addSecondUser(newUser)
                .then(addedUser => {
                  if (addedUser) {
                    res.status(200)
                      .json({
                        success: true,
                        data: helpers.desensitize(addedUser),
                      });
                  } else {
                    res.status(422)
                      .json({
                        success: false,
                        data: newUser.other_user_email + ' is already connected to a Couple!',
                      });
                  }
                });
            }
          });
      }
    })
    .catch(err => next(err));
};
