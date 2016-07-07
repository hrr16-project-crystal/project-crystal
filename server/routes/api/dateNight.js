const Yelp = require('yelp');

const YELP_KEY = new Buffer(process.env.YELP_KEY).toString();
const YELP_CONSECRET = new Buffer(process.env.YELP_CONSECRET).toString();
const YELP_TOKEN = new Buffer(process.env.YELP_TOKEN).toString();
const YELP_TOKENSECRET = new Buffer(process.env.YELP_TOKENSECRET).toString();

const yelpConfig = {
  consumer_key: YELP_KEY,
  consumer_secret: YELP_CONSECRET,
  token: YELP_TOKEN,
  token_secret: YELP_TOKENSECRET,
};

const yelp = new Yelp(yelpConfig);
const express = require('express');
const router = express.Router();

router.post('/yelp/:city', (req, res) => {
  const city = req.params.city;
  
  yelp.search({ term: 'restaurants', location: city })
  .then(data => {
    res.send(data).status(200)
  })
  .catch(function (err) {
    console.error(err);
    res.send(err).status(404)
  });
});  

module.exports = router;
