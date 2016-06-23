// Holds application secrets and config

const jwtSecret = 'aaskdjskdtorririakdkjjj';
const fbConfig = {
  appId: '1733355090253876',
  appSecret: 'd3de97cbe58a7cea4384909a8585698c',
  callbackUrl: 'http://localhost:3000/auth/facebook/callback',
};


module.exports = {
  jwtSecret,
  fbConfig,
};
