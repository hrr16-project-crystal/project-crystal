const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// Auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const facebookSignin = passport.authenticate('facebook');
const facebookSigninCallback = passport.authenticate('facebook', { failureRedirect: '/login' });

module.exports = (app) => {
  app.get('/dashboard', requireAuth, (req, res) => {
    res.status(200);
  });

  app.get('/auth/facebook', facebookSignin);
  app.get('/auth/facebook/callback', facebookSigninCallback, (req, res) => {
    res.redirect('/dashboard');
  });
  // Signin and signup routes
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
};
