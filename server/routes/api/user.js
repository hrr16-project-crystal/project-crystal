const express = require('express');
const router = express.Router();
const Users = require(__dirname + '/../../db/index').db.users;

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
          success:true,
          data
        });
    })
});

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

/**
 * Updates an existing user record.
 * @param {string} id - The unique <tt>user_id<tt>.
 * @param {Object} req - Requires updates to be found on req.body
 * @returns {}
 */
router.put('/users/:id', (req, res, next) => {
  const userId = req.params.id; 
  const objWithUpdates = req.body;
  Users.update(userId, objWithUpdates)

});

// delete single user
router.delete('/users/:id', (req, res, next) => {
  res.send('nothing yet!');
});

module.exports = router;
