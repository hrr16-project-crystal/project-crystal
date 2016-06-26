'use strict';
const express = require('express');
const router = express.Router();
const Users = require(__dirname + '/../../db/index').db.users;
const helpers = require(__dirname + '/../../helpers/helpers');

/** Get all existing users  */
router.get('/users', (req, res, next) => {
  // RF: Allow Users.all method to accept an options object to define stricter search criteria
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
            data: 'User with ID of ' + req.params.id + ' does not exist!',
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
  res.status(501).send('Update route currently not yet set up! Stay tuned :)');
});

/** Add new user and return newly added user record  */
router.post('/users/add', (req, res, next) => {
  const newUser = req.body;
  Users.checkIfExists(newUser.email)
    .then(exists => { 
      if (exists) {
        res.status(422)
          .json({
            success: false,
            data: 'Email ' + newUser.email + ' is already is use!',
          });
      } else {
        helpers.hashPassword(newUser.password)
          .then(hash => {
            newUser.password = hash;
            // RF: Unify under a single addUser method, move logic to DB controllers
            // Don't need to expose this logic in routes. newUser when passed will include is_first_of_couple flag. 
            if (newUser.is_first_of_couple) {
              Users.addFirstUser(newUser)
                .then(addedUser => {
                  res.status(200)
                    .json({
                      success: true,
                      data: helpers.desensitize(addedUser),
                    });
                });
            } else {
              Users.addSecondUser(newUser)
                .then(addedUser => {
                  if (addedUser) {
                    res.status(200)
                      .json({
                        success: true,
                        data: helpers.desensitize(addedUser),
                      });
                  } else {
                    res.status(422)
                      .json({
                        success: false,
                        data: newUser.other_user_email + ' is already connected to a Couple!',
                      });
                  }
                });
            }
          });
      }
    })
    .catch(err => next(err));
});

/** Delete single user record  */
router.delete('/users/:id', (req, res, next) => {
  // PRF: parseInt all req.params.id values? As they are all currently passing in as strings 
  Users.findById(req.params.id)
    .then(data => {
      if (!data) {
        return res.status(422)
          .json({
            success: false,
            data: 'User with ID of ' + req.params.id + ' does not exist!',
          });
      }
      Users.removeById(req.params.id)
        .then(deletedUser => {
          res.status(200)
            .json({
              status: true,
              data: helpers.desensitize(deletedUser),
            });
        });
    })
    .catch(err => next(err));
});

module.exports = router;
