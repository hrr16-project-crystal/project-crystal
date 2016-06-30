const omit = require('lodash/omit');
const clc = require('cli-color');
const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');
const each = require('lodash/each');

// desensitizes record objects, useful before passing data to front-end
exports.desensitize = (recordOrRecords) => {
  const sensitiveKeys = ['password'];
  if (Array.isArray(recordOrRecords)) {
    return recordOrRecords.map(record => omit(record, sensitiveKeys));
  }
  if (typeof recordOrRecords === 'object') {
    return omit(recordOrRecords, sensitiveKeys);
  }
  // RF: To throw own error
  // See http://www.javascriptkit.com/javatutors/trycatch2.shtml
  return new Error('There was an error desensitizing the records');
};

// Takes any amount of input and ouputs bold white text with black background and separator
// lines for clarity.
exports.customLog = (input) => {
  console.log('-------------------- Roger\'s Custom Log ---------------------');
  console.log(clc.white.bgBlack.underline(input));
  console.log('---------------------- End of Log ----------------------------');
};

// naively checks to see if an input is an email and returns true or false
exports.checkIfEmail = (possibleEmail) =>
  /@/i.test(possibleEmail);

// password hashing function
exports.hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, null, (err2, hash) => {
        if (err2) {
          reject(err2);
        }
        resolve(hash);
      });
    });
  });
};

exports.calculateSparkScore = (userScore, partnerScore) => {
  return Promise.try(function() {
    const averageScore = Math.ceil((userScore + partnerScore) / 2);
    const diff = Math.max(partnerScore, userScore) - Math.min(partnerScore, userScore);
    const tenthOfDiff = Math.floor(diff * 0.10);
    const tripled = tenthOfDiff * 3;
    const sparkScore = averageScore - tripled;
    return sparkScore;
  });
};
