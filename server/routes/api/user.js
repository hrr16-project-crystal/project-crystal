'use strict';
const express = require('express');
const router = express.Router();
const Users = require(__dirname + '/../../db/index').db.users;
const pgp = require(__dirname + '/../../db/index').pgp;
const helpers = require(__dirname + '/../../helpers/helpers');

// TEST IF UPDATED WELL
// get all users
router.get('/users', (req, res, next) => {
  Users.all()
    .then(data => {
      return res.status(200)
        .json({
          success: true,
          data: helpers.desensitize(data),
        });
    })
});

// MODIFY THIS TOO... 
// get single user
router.get('/users/:id', (req, res, next) => {
  Users.findById(req.params.id)
    .then(data => {
      return res.status(200)
        .json({
          success: true,
          data
        });
    })
});

/** Add new user and return newly added user and couple record  */
router.post('/users/add', (req, res, next) => {
  let newUser = req.body;
  Users.checkIfExists(newUser.email)
    .then(exists => {
      if (exists) {
        res.status(500)
          .json({
            success: false,
            data: 'Email is already is use',
          });
      } else {
        helpers.hashPassword(newUser.password)
          .then(hash => {
            newUser.password = hash;
            if (newUser.isFirstOfCouple) {
              Users.testAdd(newUser)
                .then(addedUser => {
                  res.send(helpers.desensitize(addedUser));
                });
            } else {
              // RF(?): Require email and a 'couple' password? Otherwise a stranger
              // can simply join the existing couple
              Users.testAddSecondUser(newUser)
                .then(addedUser => {
                  res.send(addedUser);
                });
            }
          });
      }
    })
    .catch(err => helpers.customLog(err));
});

// delete single user
router.delete('/users/:id', (req, res, next) => {
  res.send('nothing yet!');
});

module.exports = router;
