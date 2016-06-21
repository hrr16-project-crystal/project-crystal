const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// requireAuth is the middlware helper to intercept the routes
// Uses jwt strategy and when user is authenticated don't try and create a cookie session for them
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const facebookSignin = passport.authenticate('facebook');
const facebookSigninCallback = passport.authenticate('facebook', { failureRedirect: '/login' });

module.exports = (app) => {
  app.get('/dashboard', requireAuth, (req, res) => {
    res.send({ message: 'Super secret code is ABC123' });
  });
  // On the / route, make sure the user is authenticated first, otherwise block them
  app.get('/', requireAuth, (req, res) => {
    res.send({ message: 'Super secret code is ABC123' });
  });
  // On the /signin route, make sure the user is authenticated first, otherwise block them
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
  app.get('/questions', (req, res) => {
    res.send(['Did you hug today?', 'Did you kiss today']);
  });

  app.get('/auth/facebook', facebookSignin);
  app.get('/auth/facebook/callback', facebookSigninCallback, (req, res) => {
    res.redirect('/dashboard');
  });
};
