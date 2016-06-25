const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// Auth
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const facebookSignin = passport.authenticate('facebook');
const facebookSigninCallback = passport.authenticate('facebook', { failureRedirect: '/login' });

// @TODO placeholder data that will later be on each user in db
// const stats = {
//   total: 70,
//   spontaneity: 20,
//   helpful: 5,
//   romance: 99,
//   generosity: 65
// }

const testEvents = [
  {
    title: 'All Day Event',
    allDay: true,
    start: new Date(2016, 5, 0),
    end: new Date(2016, 5, 0)
  },
  {
    title: 'Long Event',
    allDay: true,
    start: new Date(2016, 5, 7),
    end: new Date(2016, 5, 10)
  },

  {
    title: 'DTS STARTS',
    start: new Date(2016, 6, 13, 0, 0, 0),
    end: new Date(2016, 6, 20, 0, 0, 0)
  },

  {
    title: 'DTS ENDS',
    start: new Date(2016, 10, 6, 0, 0, 0),
    end: new Date(2016, 10, 13, 0, 0, 0)
  },

  {
    title: 'Some Event',
    start: new Date(2016, 5, 9, 0, 0, 0),
    end: new Date(2016, 5, 9, 0, 0, 0)
  },
  {
    title: 'Conference',
    start: new Date(2016, 5, 11),
    end: new Date(2016, 5, 13),
    desc: 'Big conference for important people'
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
  
  app.get('/auth/facebook', facebookSignin);
  app.get('/auth/facebook/callback', facebookSigninCallback, (req, res) => {
    res.redirect('/dashboard');
  });
  // Signin and signup routes
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
};