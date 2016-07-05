const Yelp = require('yelp');
 
const yelpConfig = new Yelp({
  consumer_key: ,
  consumer_secret: ,
  token: ,
  token_secret: ,
});

const yelp = new Yelp(clientSecret.yelpConfig);

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
