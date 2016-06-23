'use strict';

const express = require('express');
const router = express.Router();
const Users = require(__dirname + '/../../db/index').db.users;
const pgp = require(__dirname + '/../../db/index').pgp;

// get all users
router.get('/users', (req, res, next) => {
  Users.all()
    .then(data => {
      return res.status(200)
        .json({
          success: true,
          data
        });
    })
});

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

router.post('/users/addtest', (req, res, next) => {
  const helpers = require(__dirname + '/../../helpers/helpers');
  // PRB: assume the client will pass a newUser object that matches our expectation
  // e.g.: { first_name: 'Michelle', last_name: 'Tu', isFirstOfCouple: true }
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
            helpers.customLog(hash);
            res.send(hash);
            // if (newUser.isFirstOfCouple){
            //   return Couples.add()
            // }
            // else {
            //   // deal with User being second of existing Couple
            // }
          });
      }
    })
    .catch(err => helpers.customLog(err));
});


//         if (req.body.couple === 'yes') {
//           Couples.add()
//           .then(couple => {
//             Users.add(user)
//             .then(createdUser => {
//               CouplesUsers.add(couple.couple_id, createdUser.user_id)
//               .then(coupleUser => {
//                 res.json({
//                   token: tokenForUser(createdUser),
//                   user: createdUser,
//                 });
//               });
//             });
//           });
//         } else {
//           const otherUserEmail = req.body.otherEmail
//           Users.findByEmail(otherUserEmail)
//           .then(otherUser => {
//             CouplesUsers.findByUserId(otherUser.user_id)
//             .then(coupleUser => {
//               Users.add(user)
//               .then(createdUser => {
//                 CouplesUsers.add(coupleUser.couple_id, createdUser.user_id)
//                 .then(data => {
//                   res.json({
//                     token: tokenForUser(createdUser),
//                     user: createdUser,
//                   });
//                 });
//               });
//             });
//           });
//         }
//         // Users.add(user)
//         //   .then(data => {
//         //     return res.json({
//         //       token: tokenForUser(data),
//         //       user: data,
//         //     });
//         //   })
//         //   .catch(err => {
//         //     return next(err);
//         //   });
//       });
//     });
//     });



// RF: rely on either params/queries in url, or on passed objects. Not combinations!
// add new user and return new added user
router.post('/users/add', (req, res, next) => {
  const newUserObj = req.body;
  if (req.body.couple === 'yes') {
    Users.add(newUserObj)
      .then(data => {
        return res.status(200)
          .json({
            success: true,
            data
          });
      })
      .catch(err => {
        res.json({
          success: false,
          error: err.message || err
        });
      });
  }
});

// Not working at the moment 
// Idea - limit update to single param query e.g. /users/:id/:fieldToChange
// // updates existing user record
// router.put('/users/:id', (req, res, next) => {
//   const user_id = parseInt(req.params.id);
//   const objWithUpdates = req.body;
//   res.json({
//     success: false,
//     data: 'THIS API IS NOT CURRENTLY SET UP'
//   }); 
//   Users.update(user_id, objWithUpdates, pgp)
//     .then(data => {
//       return res.status(200)
//         .json({
//           success: true,
//           data
//         });
//     })
//     .catch(err => {
//       res.json({
//         success: false,
//         error: err.message || err
//       });
//     });
// });

// delete single user
router.delete('/users/:id', (req, res, next) => {
  res.send('nothing yet!');
});

module.exports = router;
