// mock data for API Test Suites, with expected return values included. 
// RF: API Test Suites to use expected values at all times instead of hardcoded values. 
exports.firstUserOfCouple = {
  first_name: 'rodGEr',
  last_name: 'seJAS',
  email: 'roGer@GMAIL.com',
  password: 'r123',
  is_first_of_couple: true,
  expected: {
    first_name: 'rodger',
    last_name: 'sejas',
    email: 'roger@gmail.com',
    password: undefined,
    user_id: 1,
    couple_id: 1,
    have_both_users_joined: false,
    score: 0,
  },
};
exports.secondUserOfCouple = {
  first_name: 'michELLE',
  last_name: 'Tu',
  email: 'michELLE@GMAIL.com',
  password: 'm123',
  is_first_of_couple: false,
  other_user_email: 'ROGer@gmail.com',
};
exports.stranger = {
  first_name: 'stRanger',
  last_name: 'Danger',
  email: 'straNGER@GMAIL.com',
  password: 's123',
  is_first_of_couple: false,
  other_user_email: 'MIchelle@GMaiL.com',
};
exports.firstUserOfCouple2 = {
  first_name: 'miKe',
  last_name: 'cruZ',
  email: 'mike@GMAIL.com',
  password: 'm1234',
  is_first_of_couple: true,
};
exports.secondUserOfCouple2 = {
  first_name: 'mrs',
  last_name: 'cruz',
  email: 'mrs@GMAIL.com',
  password: 'm4321',
  is_first_of_couple: false,
  other_user_email: 'mike@gmail.com',
  expected: {
    first_name: 'mrs',
    last_name: 'cruz',
    email: 'mrs@gmail.com',
    password: undefined,
    have_both_users_joined: true,
    user_id: 4,
    couple_id: 2,
    score: 0,
  },
};
