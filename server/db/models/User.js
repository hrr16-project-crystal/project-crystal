const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define the model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

// Before saving the user model, encrypt password => Can't use arrow function because of 'this'
userSchema.pre('save', function (next) {
  // Get access to the user model
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    // style guide is throwing an error on 'err' argument but if removed then signin breaks
    return bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      return next();
    });
  });
});

// Whenever we create a user object it is going to have access to any functions we define on methods
// => Can't use arrow function because of 'this'
userSchema.methods.comparePassword = function (candidatePassword, callback) {
  // this.password is the hashed and salted password in the user
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) {
      return callback(err);
    }
    return callback(null, isMatch);
  });
};

// Create the model class
const User = mongoose.model('Users', userSchema);

// Export the model
module.exports = User;
