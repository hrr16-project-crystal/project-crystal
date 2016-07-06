'use strict';

const express = require('express');
const router = express.Router();
const Lovebucks = require(__dirname + '/../../db/index').db.lovebucks;
const Users = require(__dirname + '/../../db/index').db.users;
const Couples = require(__dirname + '/../../db/index').db.couples;
const pgp = require(__dirname + '/../../db/index').pgp;

// get all questions
router.get('/lovebucks/:id', (req, res, next) => {
  Lovebucks.findByCoupleId(req.params.id)
    .then(data => {
      console.log(data);
      return res.status(200)
        .json({
          success: true,
          data,
        });
    });
});

// add new message and return newly added message
router.post('/lovebucks', (req, res, next) => {
  console.log('about to add to db', req.body);
  //find partner id
  const newGift = req.body;
  let foundPartner;
  if (newGift.type === 1){
    Lovebucks.add(newGift)
      .then(data => {
        console.log('ADDED lovebuck transaction');
        Users.updateBucks(+newGift.points, newGift.user_id)
        .then(updated => {
          return res.status(200)
            .json({
              success: true,
              updated,
            });
          })
      })
  } else {
    Couples.getBothUsers(req.body.couple_id)
      .then(couple => {
        console.log(couple);
        couple.forEach( partner => {
          if (partner.user_id !== newGift.user_id){
            foundPartner = partner;
          }
        });

        // add points to partner
        console.log('found partner', foundPartner.user_id);
        Lovebucks.add(newGift)
          .then(data => {
            console.log('ADDED lovebuck transaction');
            Users.updateBucks(+newGift.points, foundPartner.user_id)
            .then(updated => {
              return res.status(200)
                .json({
                  success: true,
                  updated,
                });
              })
          })
          .catch(err => {
            res.json({
              success: false,
              error: err.message || err,
            });
          });
      })
    }

  //add transaction and return points
  
});

module.exports = router;
