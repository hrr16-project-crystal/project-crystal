const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// requireAuth is the middlware helper to intercept the routes
// Uses jwt strategy and when user is authenticated don't try and create a cookie session for them
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });
const facebookSignin = passport.authenticate('facebook');
const facebookSigninCallback = passport.authenticate('facebook', { failureRedirect: '/login' });

const dbQuestions = {
  sucess: true,
  data: [
    {
      body: 'What do your friends and family think of your partner?',
      frequency: 'initial',
      tag: 'friendsFamily',
      answers: {
        answers: [
          "They think the two of you are soulmates",
          "They think s/he is good for you",
          "They are indifferent",
          "They have warned you about your partner and/or dont approve" 
        ]
      }
    },
    {
      body: 'What sort of arrangement do the two of you have regarding your finances?',
      frequency: 'initial',
      tag: 'finances',
      answers: {
        answers: [
        "We have joint accounts",
        "We have discussed finances and have a plan in place",
        "Our finances are completely separate",
        "We have never talked about money"
        ]
      }
    },
    {
      body: 'Where does this relationship fall with regards to past relationships for you?',
      frequency: 'initial',
      tag: 'pastRelationships',
      answers: {
        answers: [
        "Best Ive ever had",
        "Its good",
        "A little bit of everything or mid range",
        "Not the best relationship Ive had"
        ]
      }
    },
    {
      body: 'Can you picture your life without your partner?',
      frequency: 'initial',
      tag: 'lifePicture',
      answers: {
        answers: [
          'Cant do it',
          'Never thought about it, but now that you mention it? I cant',
          'Maybe or Probably',
          'Ill be fine either way'
        ]
      }
    },
    {
      body: 'Do you celebrate your anniversaries or special moments?',
      frequency: 'initial',
      tag: 'celebrate',
      answers: {
        answers: [
          'Never',
          'Rarely',
          'Once in a while',
          'Often'
        ]
      }
    }
  ]
};

const stats = {
  total: 70,
  spontaneity: 20,
  helpful: 5,
  romance: 99,
  generosity: 65
}

const answered = {
  tag: {
    friendsFamily: 0,
    finances: 0,
    pastRelationships: 0,
    lifePicture: 0,
    celebrate: 0
  }
};

const secretAlgo = () => {
  for (var key in answered.tag) {
    stats.total+=answered.tag[key];
  }
}

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
    res.send(dbQuestions);
  });
  app.post('/questions/answered', (req, res) => {
    res.send('Success');
  });

  app.get('/health', (req, res) => {
    res.send(stats);
  });

  app.get('/auth/facebook', facebookSignin);
  app.get('/auth/facebook/callback', facebookSigninCallback, (req, res) => {
    res.redirect('/dashboard');
  });
};
