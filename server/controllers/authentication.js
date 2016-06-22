const jwt = require('jwt-simple');
const config = require('../../config');
const Users = require(__dirname + '/../db/index').db.users;
const pgp = require(__dirname + '/../db/index').pgp; 
const bcrypt = require('bcrypt-nodejs');

const tokenForUser = user => {
  // First argument is what to encode and the second is the secret to use
  // Sub is short for Subject and it is the convention used for JWT
  // iat is short for Issued at Time and is another convention used for JWT
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.jwtSecret);
};

exports.signin = (req, res, next) => {
  // User has already had their email and password auth'd ,just need to give them a token
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = (req, res, next) => {
  const first_name = req.body.firstName;
  const last_name = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;

  Users.findByEmail(req.body.email)
    .then(data => {
    // If a user with email does exist then return an error
      if (data) {
        return res.status(422).send({ error: 'Email is in use' });
      }
    // Otherwise, create and save user request
    const user = {
      first_name,
      last_name,
      email,
      password
    };

    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err);
      }
      return bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) {
          return next(err);
        }
        user.password = hash;
        Users.add(user)
          .then(data => {
            return res.json({ token: tokenForUser(user) });
          })
          .catch(err => {
            return next(err);
          });
      });
    });

    
  });
};

