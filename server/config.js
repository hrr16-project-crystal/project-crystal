// Holds application secrets and config

const jwtSecret = 'aaskdjskdtorririakdkjjj';
const fbConfig = {
  appId: '1733355090253876',
  appSecret: 'd3de97cbe58a7cea4384909a8585698c',
  callbackUrl: 'http://localhost:3000/auth/facebook/callback',
};
const yelpConfig = {
  consumer_key: 'rUJMt1ItNo_L7SRSl8kD5g',
  consumer_secret: 'X8I7THNYRYxmBvwe246kt5r8i3Y',
  token: 'lYNQ4I74jQte7E0Qg0y5ZDgDSzeD6gpL',
  token_secret: 'W7rwtXl75IN6E_5O6DSF9j33h6Q',
};


module.exports = {
  jwtSecret,
  fbConfig,
  yelpConfig,
};
