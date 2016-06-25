const omit = require('lodash/omit');
const clc = require('cli-color');
const bcrypt = require('bcrypt-nodejs');
const Promise = require('bluebird');

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

// logs input in bold white text with black background
exports.customLog = (input) => {
  console.log(clc.white.bgBlack.underline(input));
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
