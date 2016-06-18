const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// requireAuth is the middlware helper to intercept the routes
// Uses jwt strategy and when user is authenticated don't try and create a cookie session for them
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = (app) => {
  // On the / route, make sure the user is authenticated first, otherwise block them
  app.get('/', requireAuth, (req, res) => {
    res.send({ hi: 'there' });
  });
  // On the /signin route, make sure the user is authenticated first, otherwise block them
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
};
