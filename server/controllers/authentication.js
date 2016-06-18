const User = require('../db/models/User');
const jwt = require('jwt-simple');
const config = require('../../config');

const tokenForUser = user => {
  // First argument is what to encode and the second is the secret to use
  // Sub is short for Subject and it is the convention used for JWT
  // iat is short for Issued at Time and is another convention used for JWT
  const timestap = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestap }, config.secret);
};

exports.signin = (req, res, next) => {
  // User has already had their email and password auth'd ,just need to give them a token
  res.send({ token: tokenForUser(req.user) });
};

exports.signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  // Used to make sure both email and password have been entered.
  // Can also check for more validation (i.e. @domain.com)
  if (!email || !password) {
    return res.status(422).send({ error: 'You must provide an email and password' });
  }

  // Used return statement for Style Guide needing return (lines 12,26,31)
  // See if a user with the given email exists.
  return User.findOne({ email }, (err, data) => {
    if (err) {
      return next(err);
    }
    // If a user with email does exist then return an error
    if (data) {
      return res.status(422).send({ error: 'Email is in use' });
    }
    // Otherwise, create and save user request
    const user = new User({
      // Using ES6 object property shorthand
      email,
      password,
    });
    // Removed 'err' argument for Style guide no reusing variables in top level scope
    return user.save(() => {
      if (err) {
        return next(err);
      }
      // Respond to request when the user was created with the JWT
      return res.json({ token: tokenForUser(user) });
    });
  });
};
