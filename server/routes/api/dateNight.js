// var yelp = require ('../../server');

const Yelp = require('yelp');
 
const yelp = new Yelp({
  consumer_key: 'rUJMt1ItNo_L7SRSl8kD5g',
  consumer_secret: 'X8I7THNYRYxmBvwe246kt5r8i3Y',
  token: 'lYNQ4I74jQte7E0Qg0y5ZDgDSzeD6gpL',
  token_secret: 'W7rwtXl75IN6E_5O6DSF9j33h6Q',
});

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
