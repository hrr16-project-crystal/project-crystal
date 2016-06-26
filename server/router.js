const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');
const moment = require('moment');

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
  // {
  //   title: 'All Day Event',
  //   allDay: true,
  //   // Year, month, day, hours, minutes
  //   start: new Date(2016, 5, 1, 18, 15),
  //   end: new Date(2016, 5, 1, 21, 15)
  // },
  // {
  //   title: 'Long Event',
  //   allDay: true,
  //   start: new Date(2016, 5, 7),
  //   end: new Date(2016, 5, 10)
  // },

  // {
  //   title: 'DTS STARTS',
  //   start: new Date(2016, 6, 13, 0, 0, 0),
  //   end: new Date(2016, 6, 20, 0, 0, 0)
  // },

  // {
  //   title: 'DTS ENDS',
  //   start: new Date(2016, 10, 6, 0, 0, 0),
  //   end: new Date(2016, 10, 13, 0, 0, 0)
  // },

  // {
  //   title: 'Some Event',
  //   start: new Date(2016, 5, 9, 0, 0, 0),
  //   end: new Date(2016, 5, 9, 0, 0, 0)
  // },
  {
    title: 'Conference',
    start: new Date(2016, 5, 11, 14, 45),
    end: new Date(2016, 5, 11, 16, 45),
    desc: 'Big conference for important people',
  },
  {
    title: 'Conference 2',
    start: new Date(2016, 5, 11, 19, 45),
    end: new Date(2016, 5, 11, 22),
    desc: 'Big conference 2 for important people'
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
    // const consLog = moment(new Date(2016, 5, 11, 14, 45)).format('ddd MMM DD YYYY HH:mm:ss') + ' GMT-0400 (EDT)';
    // const secLog = moment.utc(1466959039316).toDate();
    // console.log(typeof secLog);
    // console.log(secLog);
    // // Sat Jun 11 2016 12:30:00 GMT-0400 (EDT)
    // console.log(new Date(Date.UTC(2016, 5, 11, 14, 45)));
    // console.log(new Date().getTime());
    // console.log('-------');
    // const momDate = moment().toDate();
    // console.log(typeof momDate);
    // console.log(momDate);
    res.send(testEvents);
  });

  app.post('/createevent', (req, res) => {
    console.log('server-------');
    console.log(req.body);
  });

  app.get('/auth/facebook', facebookSignin);
  app.get('/auth/facebook/callback', facebookSigninCallback, (req, res) => {
    res.redirect('/dashboard');
  });
  // Signin and signup routes
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
};