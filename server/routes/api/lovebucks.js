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
      return res.status(200)
        .json({
          success: true,
          data,
        });
    });
});

router.post('/lovebucks', (req, res, next) => {
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
        couple.forEach( partner => {
          if (partner.user_id !== newGift.user_id){
            foundPartner = partner;
          }
        });
        //add transaction and return points
        Lovebucks.add(newGift)
          .then(data => {
            // add points to partner
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

  
});

module.exports = router;
