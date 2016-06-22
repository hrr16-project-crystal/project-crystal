const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// Auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const facebookSignin = passport.authenticate('facebook');
const facebookSigninCallback = passport.authenticate('facebook', { failureRedirect: '/login' });

// @TODO placeholder data that will later be on each user in db
const stats = {
  total: 70,
  spontaneity: 20,
  helpful: 5,
  romance: 99,
  generosity: 65
}

module.exports = (app) => {
  app.get('/dashboard', requireAuth, (req, res) => {
    res.status(200);
  });
  // @TODO serves up fake stats from above currently
  app.get('/health', (req, res) => {
    res.send(stats);
  });
  app.get('/auth/facebook', facebookSignin);
  app.get('/auth/facebook/callback', facebookSigninCallback, (req, res) => {
    res.redirect('/dashboard');
  });
  // Signin and signup routes
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
};