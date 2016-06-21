const express = require('express');
const router = express.Router();
const db = require(__dirname + '/../../db/index').db;
const Couples = db.couples,
  CouplesUsers = db.couples_users;
const pgp = require(__dirname + '/../../db/index').pgp;

// RF: inner join, return couple + user info
// get all couples
router.get('/couples', (req, res, next) => {
  Couples.all()
    .then(data => {
      return res.status(200)
        .json({
          success: true,
          data
        });
    })
});

// RF: Inner join, return couple + user infos
// get single couple
router.get('/couples/:id', (req, res, next) => {
  Couples.findById(req.params.id)
    .then(data => {
      return res.status(200)
        .json({
          success: true,
          data
        });
    })
});

// RF: inner join, returng couple + user info
// add new couple and return newly added couple information
// expecting /couples/add?user1_id=314&user2_id=912
router.post('/couples/add', (req, res, next) => {
  const user1_id = parseInt(req.query.user1_id);
  const user2_id = parseInt(req.query.user2_id);
  const initialScore = 0;

  Couples.add(initialScore)
    .then(data => {
      CouplesUsers.add(data.couple_id, user1_id)
        .then(CouplesUsers.add(data.couple_id, user2_id))
        .then(data => {
          res.status(200)
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
    })
});

// RF: Currently hardcoded to score. Should make variable param for any-field update
// update couple relationship score and return couple
router.put('/couples/:score', (req, res, next) => {
  Couples.updateScore(couple_id, score)
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

// delete single user
router.delete('/users/:id', (req, res, next) => {
  res.send('nothing yet!');
});

module.exports = router;
