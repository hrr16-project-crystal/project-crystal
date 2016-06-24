'use strict';
const express = require('express');
const router = express.Router();
const Users = require(__dirname + '/../../db/index').db.users;
const helpers = require(__dirname + '/../../helpers/helpers');

/** Get all existing users  */
router.get('/users', (req, res, next) => {
  Users.all()
    .then(data => {
      return res.status(200)
        .json({
          success: true,
          data: helpers.desensitize(data),
        });
    })
    .catch(err => next(err));
});

/** Get single user record  */
router.get('/users/:id', (req, res, next) => {
  Users.findById(req.params.id)
    .then(data => {
      if (!data) {
        return res.status(500)
          .json({
            success: false,
            data: 'User with ID of ' + req.params.id + ' does not exist',
          });
      }
      return res.status(200)
        .json({
          success: true,
          data: helpers.desensitize(data),
        });
    })
    .catch(err => next(err));
});

/** Update single user record  */
router.put('/users/:id', (req, res, next) => {
  res.send('Update route currently not yet set up! Stay tuned :)'); 
});

/** Add new user and return newly added user record  */
router.post('/users/add', (req, res, next) => {
  const newUser = req.body;
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
              Users.add(newUser)
                .then(addedUser => {
                  res.send(helpers.desensitize(addedUser));
                });
            } else {
              Users.addSecondUser(newUser)
                .then(addedUser => {
                  res.send(helpers.desensitize(addedUser));
                });
            }
          });
      }
    })
    .catch(err => next(err));
});

/** Delete single user record  */
router.delete('/users/:id', (req, res, next) => {
  Users.findById(req.params.id)
    .then(exists => {
      if (!exists) {
        res.status(500)
          .json({
            success: false,
            data: 'User with ID of ' + req.params.id + ' does not exit',
          });
      } else {
        Users.removeById(req.params.id)
          .then(deletedUser => {
            return res.status(200)
              .json({
                success: true,
                data: helpers.desensitize(deletedUser),
              });
          });
      }
    })
    .catch(err => next(err));
});

module.exports = router;
