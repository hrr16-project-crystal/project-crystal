const Yelp = require('yelp');

const yelpConfig = {
  consumer_key: process.env.YELP_KEY,
  consumer_secret: process.env.YELP_CONSECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKENSECRET,
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
