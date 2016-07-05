const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const path = require('path');
const axios = require('axios');
const fitbit = require('./config');

// Auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const facebookSignin = passport.authenticate('facebook');
const facebookSigninCallback = passport.authenticate('facebook', { failureRedirect: '/login' });
const fitbitAuth = passport.authenticate('fitbit', { scope: ['activity', 'nutrition'] });

module.exports = (app) => {
  app.get('/', requireAuth, (req, res) => {
    res.status(200).send(initialState);
  });

  app.get('/auth/facebook', facebookSignin);
  app.get('/auth/facebook/callback', facebookSigninCallback, (req, res) => {
    res.redirect('/dashboard');
  });

  app.get('/auth/fitbit/callback', (req, res, next) => {
    const code = req.query.code;
    axios.post(`https://api.fitbit.com/oauth2/token?client_id=${fitbit.fitbitConfig.clientID}&grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:3000/auth/fitbit/callback`, null, {
      headers: {
        Authorization: `Basic ${new Buffer(`${fitbit.fitbitConfig.clientID}:${fitbit.fitbitConfig.clientSecret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(response => {
      console.log(response.data);
      // Need to store access token for this user...
      res.redirect(`/dashboard&access_token=${response.data.refresh_token}`);
    })
    .catch(err => {
      console.log(err.data.errors);
    })
  });
  // Signin and signup routes
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
};
