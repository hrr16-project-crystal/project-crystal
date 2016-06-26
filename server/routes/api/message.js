const express = require('express');
const router = express.Router();
const Messages = require(__dirname + '/../../db/index').db.messages;
const pgp = require(__dirname + '/../../db/index').pgp;

// get all questions
router.get('/message/:id', (req, res, next) => {
  Messages.findByCoupleId(req.params.id)
    .then(data => {
      return res.status(200)
        .json({
          success: true,
          data,
        });
    });
});

// add new message and return newly added message
router.post('/message', (req, res, next) => {
  console.log('about to add to db', req.body);
  const newMessage = req.body;
  Messages.add(newMessage)
    .then(data => {
      console.log('ADDED');
      return res.status(200)
        .json({
          success: true,
          data,
        });
    })
    .catch(err => {
      res.json({
        success: false,
        error: err.message || err,
      });
    });
});

// updates single message
router.put('/message', (req, res, next) => {
  Messages.update(req.body)
    .then(data => {
      return res.status(200)
        .json({
          success: true,
          data,
        })
    })
    .catch(err => {
      res.json({
        success: false,
        error: err.message || err,
      });
    });
});

module.exports = router;
