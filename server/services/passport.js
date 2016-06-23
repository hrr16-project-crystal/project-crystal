// Passport checks requests before they hit the protected routes/controllers
// Passport will have a couple strategies and then pass the request to the route handler
const passport = require('passport');
const bcrypt = require('bcrypt-nodejs');
// const User = require('../db/models/User');
const config = require('../../config');
const Users = require(__dirname + '/../db/index').db.users;
const pgp = require(__dirname + '/../db/index').pgp; 
// A strategy is a method for authenticating a user (can be used for FB/Google login) aka plugin
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
// LocalStrategy is to verify the email and password when signing in to app.
const LocalStrategy = require('passport-local');
const FacebookStrategy = require('passport-facebook').Strategy;


const comparePassword = function (dbpass, candidatePassword, callback) {
  bcrypt.compare(candidatePassword, dbpass, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    return callback(null, isMatch);
  });
};
// Create local strategy
// Since we're using email to get users signed up, we need to reset the key to use email
// for use with LocalStrategy. By default, it looks for username and password (we have email and pw)
const localOptions = { usernameField: 'email' };

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  // Verify this email and password, call done with the user
  // if it is the correct email and password
  // otherwise, call done with false
  Users.findByEmail(email)
    .then(data => {
      console.log(data);
      return comparePassword(data.password, password, (err, isMatch) => {
        if (err) { return done(err); }
        if (!isMatch) { return done(null, false); }

        return done(null, data);
      });
    })
    .catch(err => {
      return done(err, false);
    });
});

// Configure the options for the JwtStrategy
const jwtOptions = {
  // Whenever a request comes in, it needs to look at request header matching authorization
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: config.jwtSecret,
};
// Create the JWT Strategy. First arg is the configuration option.
// Second is callback when we need to authenticate a user with a jwt token
// Payload is decoded jwt token (comes from auth controller (jwt.encode function)).
// Done is a callback that gets called depending on if we successfully authenticate the user
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // See if the user ID in the payload exists in our database
  User.findById(payload.sub, (err, user) => {
    if (err) {
      return done(err, false);
    }
    // If user ID exists, call done with that user
    if (user) {
      done(null, user);
    }
    // Otherwise, call done without a user object
    return done(null, false);
  });
});

// Setup for Facebook Login
const fbOptions = {
  clientID: config.fbConfig.appId,
  clientSecret: config.fbConfig.appSecret,
  callbackURL: config.fbConfig.callbackUrl,
};

const fbLogin = new FacebookStrategy(fbOptions, (accessToken, refreshToken, profile, done) => {
  User.findOrCreate({ email: profile.emails[0].value }, (err, user) => {
    if (err) {
      return done(err);
    }
    if (user) {
      return done(null, user);
    }
    const newUser = new User();

    // newUser.fb.id = profile.id;
    // newUser.fb.accessToken = accessToken;
    // newUser.fb.firstName = profile.name.givenName;
    // newUser.fb.lastName = profile.name.familyName;
    // newUser.fb.email = profile.emails[0].value;

    newUser.save((err) => {
      if (err) {
        throw err;
      }
      return done(null, newUser);
    });
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
passport.use(fbLogin);