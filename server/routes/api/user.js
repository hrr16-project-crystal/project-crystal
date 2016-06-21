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

// RF: rely on either params/queries in url, or on passed objects. Not combinations!
// add new user and return new added user
router.post('/users/add', (req, res, next) => {
  const newUserObj = req.body;
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
