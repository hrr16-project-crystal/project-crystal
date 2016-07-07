const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const path = require('path');
const axios = require('axios');
const fitbit = {
  clientID: process.env.FIT_CLIENTID,
  clientSecret: process.env.FIT_CLIENTSECRET,
  callbackURI: process.env.FIT_URI,
};

// Auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const facebookSignin = passport.authenticate('facebook');
const facebookSigninCallback = passport.authenticate('facebook', { failureRedirect: '/login' });

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
    const userID = req.query.state;
    // Need to update localhost address...
    axios.post(`https://api.fitbit.com/oauth2/token?client_id=${fitbit.clientID}&grant_type=authorization_code&code=${code}&redirect_uri=http://localhost:9000/auth/fitbit/callback&state=${userID}`, null, {
      headers: {
        Authorization: `Basic ${new Buffer(`${fitbit.clientID}:${fitbit.clientSecret}`).toString('base64')}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    .then(response => {
      req.userID = Number(userID);
      req.access_token = response.data.access_token;
      req.refresh_token = response.data.refresh_token;
      req.fitbit_id = response.data.user_id;
      next();
    })
    .catch(err => {
      console.log(err.data.errors);
    });
  }, Authentication.fitbitHandler);
  // Signin and signup routes
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
};
