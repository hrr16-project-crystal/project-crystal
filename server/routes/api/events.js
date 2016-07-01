const express = require('express');
const router = express.Router();
const Events = require(`${__dirname}/../../db/index`).db.events;
const pgp = require(`${__dirname}/../../db/index`).pgp;

// Get events for the couple by the coupleID
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

// Add new event and return newly added event
router.post('/events/add', (req, res, next) => {
  const newEvent = req.body;
  // Need to set the start_date, end_date, and couple_id to work with the DB schema design
  newEvent.start_date = newEvent.start;
  newEvent.end_date = newEvent.end;
  newEvent.couple_id = newEvent.coupleID;
  console.log('eventpost - newEvent', newEvent);
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

// Delete single event
router.delete('/events/delete/:id', (req, res, next) => {
  const eventID = parseInt(req.params.id);
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
