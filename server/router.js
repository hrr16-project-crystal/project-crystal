const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// Auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const facebookSignin = passport.authenticate('facebook');
const facebookSigninCallback = passport.authenticate('facebook', { failureRedirect: '/login' });

const testEvents = [
  {
    title: 'Conference',
    start: new Date(2016, 5, 11, 14, 45),
    end: new Date(2016, 5, 11, 16, 45),
    desc: 'Big conference for important people',
  },
  {
    title: 'Conference 2',
    start: new Date(2016, 5, 11, 19, 45),
    end: new Date(2016, 5, 11, 22, 0),
    desc: 'Big conference 2 for important people',
  },
  {
    title: 'Conference 3',
    start: '2016-06-29T12:00:00.000Z',
    end: '2016-06-29T19:00:00.000Z',
    desc: 'I like Javascript',
  },
];

module.exports = (app) => {
  app.get('/dashboard', requireAuth, (req, res) => {
    res.status(200);
  });
  // @TODO serves up fake stats from above currently
  // app.get('/health', (req, res) => {
  //   res.send(stats);
  // });
  app.get('/testevents', (req, res) => {
    res.send(testEvents);
  });

  app.post('/createevent', (req, res) => {
    console.log('server-------');
    console.log(req.body);
    testEvents.push(req.body);
    console.log(testEvents);
  });

  app.get('/auth/facebook', facebookSignin);
  app.get('/auth/facebook/callback', facebookSigninCallback, (req, res) => {
    res.redirect('/dashboard');
  });
  // Signin and signup routes
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
};