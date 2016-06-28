const express = require('express');
const router = express.Router();
const Events = require(`${__dirname}/../../db/index`).db.events;
const pgp = require(`${__dirname}/../../db/index`).pgp;

// get events for the couple
router.get('/events/:id', (req, res, next) => {
  const coupleID = parseInt(req.params.id);
  Events.findById(coupleID)
    .then(data => {
      return res.status(200)
        .json({
          success: true,
          data,
        });
    });
});

// add new event and return newly added event
router.post('/events/add', (req, res, next) => {
  const newEvent = req.body;
  newEvent.start_date = newEvent.start;
  newEvent.end_date = newEvent.end;
  newEvent.couple_id = newEvent.coupleID;

  Events.add(newEvent)
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
        error: err.message || err,
      });
    });
});

// delete single event
router.delete('/events/:id', (req, res, next) => {
  const eventID = req.params.id;
  Events.remove(eventID)
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
        error: err.message || err,
      });
    });
});

module.exports = router;
