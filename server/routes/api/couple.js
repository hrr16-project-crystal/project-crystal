const express = require('express');
const router = express.Router();
const db = require(__dirname + '/../../db/index').db;
const Couples = db.couples;
const Users = db.users;
const CouplesUsers = db.couples_users;
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
    .catch(err => {
      res.json({
        success: false,
        error: err.message || err
      });
    });
});

// RF: Inner join, return couple + user infos
// get single couple
router.get('/couples/:id', (req, res, next) => {
  const couple_id = parseInt(req.params.id);
  Couples.findById(couple_id)
    .then(data => {
      return res.status(200)
        .json({
          success: true,
          data,
        });
    })
    .catch(err => {
      res.json({
        success: false,
        error: err.message || err
      });
    });
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

router.post('/couples/answers', (req, res, next) => {
  const result = req.body;
  // Use userId to get coupleID
  Users.findById(req.body.user_id)
  // update couple score using coupleID
  .then(foundUserWithCouple => {
    Couples.updateScore(result, foundUserWithCouple.couple_id)
    .then(data => {
      console.log(data)
    })
  });
});

// update couple relationship score and return couple
router.put('/couples/:id/:score', (req, res, next) => {
  const couple_id = parseInt(req.params.id),
    score = parseInt(req.params.score);
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

// delete a couple and return the deleted couple
router.delete('/couples/:id', (req, res, next) => {
  const couple_id = parseInt(req.params.id);
  Couples.remove(couple_id)
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

module.exports = router;
