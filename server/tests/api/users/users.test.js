'use strict';
// let request = require('supertest');
const httpStatus = require('http-status');
const chai = require('chai');
const expect = chai.expect;
const app = require(__dirname + '/../../../server');
const mockUsers = require(__dirname + '/mockData.js');
const each = require('lodash/each');
const request = require('supertest')('http://localhost:3000');
// chai.config.includeStack = true;  =>  if want to display stack trace

describe('## User APIs', function() {

  describe('-- Webpack loading... --', function() {
    before(function(done) {
      // RF: Do DB or table drops on app initialisation
      // RF: Need alternative to setTimeout in before hook, to account for loadtime.  
      setTimeout(() => { done(); }, 1800);
    });

    describe('# POST /api/v1/users/add', function() {

      it('It should allow a first User to sign up and should generate a new, linked Couple', function(done) {
        const firstUser = Object.assign({}, mockUsers.firstUserOfCouple);
        request
          .post('/api/v1/users/add')
          .send(firstUser)
          .expect(httpStatus.OK)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.body.success).to.equal(true);
            expect(res.body.data.email).to.equal(firstUser.expected.email);
            expect(res.body.data.first_name).to.equal(firstUser.expected.first_name);
            expect(res.body.data.last_name).to.equal(firstUser.expected.last_name);
            expect(res.body.data.password).to.equal(firstUser.expected.password);
            expect(res.body.data.couple_id).to.equal(firstUser.expected.couple_id);
            expect(res.body.data.user_id).to.equal(firstUser.expected.user_id);
            expect(res.body.data.score).to.equal(firstUser.expected.score);
            expect(res.body.data.have_both_users_joined).to.equal(firstUser.expected.have_both_users_joined);
            // =====================================================
            // expect(res.body.success).to.equal(true);
            // expect(res.body.data.email).to.equal(firstUser.email.toLowerCase());
            // expect(res.body.data.first_name).to.equal(firstUser.first_name.toLowerCase());
            // expect(res.body.data.last_name).to.equal(firstUser.last_name.toLowerCase());
            // expect(res.body.data.password).to.equal(undefined);
            // expect(res.body.data.couple_id).to.equal(1);
            // expect(res.body.data.user_id).to.equal(1);
            // expect(res.body.data.score).to.equal(0);
            // expect(res.body.data.have_both_users_joined).to.equal(false);

            // RF: Add to account for other properties returning on couple e.g. couple scores
            // RF URGENT: Add DB so can query directly if user added in DB
            // as currently only tests if valid response returns from server
            done();
          });
      });

      // RF URGENT: Add DB so can query directly if user added in DB
      // as currently only tests if valid response returns from server
      it('It should NOT allow a subsequent user to sign up with the same email, even where the email is in a different case', function(done) {
        const firstUserWithUpperCasedEmail = Object.assign(mockUsers.firstUserOfCouple, { email: mockUsers.firstUserOfCouple.email.toUpperCase() });
        request
          .post('/api/v1/users/add')
          .send(firstUserWithUpperCasedEmail)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.body.success).to.equal(false);
            done();
          });
      });

      // RF URGENT: Add DB so can query directly if user added in DB
      // as currently only tests if valid response returns from server  
      it('It should allow a second User to sign up and link to an existing, incomplete Couple by referencing an existing User\'s email', function(done) {
        const secondUser = Object.assign({}, mockUsers.secondUserOfCouple);
        request
          .post('/api/v1/users/add')
          .send(secondUser)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.body.success).to.equal(true);
            expect(res.body.data.email).to.equal(secondUser.email.toLowerCase());
            expect(res.body.data.first_name).to.equal(secondUser.first_name.toLowerCase());
            expect(res.body.data.last_name).to.equal(secondUser.last_name.toLowerCase());
            expect(res.body.data.password).to.equal(undefined);
            expect(res.body.data.couple_id).to.equal(1);
            expect(res.body.data.user_id).to.equal(2);
            expect(res.body.data.score).to.equal(0);
            expect(res.body.data.have_both_users_joined).to.equal(true);
            done();
          });
      });

      // RF URGENT: Add DB so can query directly if user added in DB
      // as currently only tests if valid response returns from server  
      // RF: More specific test, as current test failure signal (success: false) may refer to other types of failure?
      it('It should NOT allow a third User to sign up and link to an existing, complete Couple by referencing an existing User\'s email', function(done) {
        const stranger = Object.assign({}, mockUsers.stranger);
        request
          .post('/api/v1/users/add')
          .send(stranger)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.body.success).to.equal(false);
            done();
          });
      });

      // add additional sequenced tests here
      it('It should allow a third User to sign up and should generate a second, new, linked Couple', function(done) {
        const thirdUser = Object.assign({}, mockUsers.firstUserOfCouple2);
        request
          .post('/api/v1/users/add')
          .send(thirdUser)
          .expect(httpStatus.OK)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.body.success).to.equal(true);
            expect(res.body.data.email).to.equal(thirdUser.email.toLowerCase());
            expect(res.body.data.first_name).to.equal(thirdUser.first_name.toLowerCase());
            expect(res.body.data.last_name).to.equal(thirdUser.last_name.toLowerCase());
            expect(res.body.data.password).to.equal(undefined);
            expect(res.body.data.couple_id).to.equal(2);
            expect(res.body.data.user_id).to.equal(3);
            expect(res.body.data.score).to.equal(0);
            expect(res.body.data.have_both_users_joined).to.equal(false);
            // RF: Add to account for other properties returning on couple e.g. couple scores
            // RF URGENT: Add DB so can query directly if user added in DB
            // as currently only tests if valid response returns from server
            done();
          });
      });

      // RF URGENT: Add DB so can query directly if user added in DB
      // as currently only tests if valid response returns from server  
      it('It should allow a fourth User to sign up and link to the second existing, incomplete Couple by referencing the third User\'s email', function(done) {
        const fourthUser = Object.assign({}, mockUsers.secondUserOfCouple2);
        request
          .post('/api/v1/users/add')
          .send(fourthUser)
          .end(function(err, res) {
            if (err) return done(err);
            // console.log('==================');
            // console.log(fourthUser);
            // console.log(res.body);
            // console.log('==================');
            expect(res.body.success).to.equal(true);
            expect(res.body.data.email).to.equal(fourthUser.expected.email);
            expect(res.body.data.first_name).to.equal(fourthUser.expected.first_name);
            expect(res.body.data.last_name).to.equal(fourthUser.expected.last_name);
            expect(res.body.data.password).to.equal(fourthUser.expected.password);
            expect(res.body.data.couple_id).to.equal(fourthUser.expected.couple_id);
            expect(res.body.data.user_id).to.equal(fourthUser.expected.user_id);
            expect(res.body.data.score).to.equal(fourthUser.expected.score);
            expect(res.body.data.have_both_users_joined).to.equal(fourthUser.expected.have_both_users_joined);
            done();
          });
      });

      // // RF URGENT: Add DB so can query directly if user added in DB
      // // as currently only tests if valid response returns from server  
      // it('It should allow a fourth User to sign up and link to the second existing, incomplete Couple by referencing the third User\'s email', function(done) {
      //   const fourthUser = Object.assign({}, mockUsers.secondUserOfCouple2);
      //   request
      //     .post('/api/v1/users/add')
      //     .send(fourthUser)
      //     .end(function(err, res) {
      //       if (err) return done(err);
      //       // console.log('==================');
      //       // console.log(fourthUser);
      //       // console.log(res.body);
      //       // console.log('==================');
      //       expect(res.body.success).to.equal(true);
      //       expect(res.body.data.email).to.equal(fourthUser.expected.email);
      //       expect(res.body.data.first_name).to.equal(fourthUser.expected.first_name);
      //       expect(res.body.data.last_name).to.equal(fourthUser.expected.last_name);
      //       expect(res.body.data.password).to.equal(fourthUser.expected.password);
      //       expect(res.body.data.couple_id).to.equal(fourthUser.expected.couple_id);
      //       expect(res.body.data.user_id).to.equal(fourthUser.expected.user_id);
      //       expect(res.body.data.score).to.equal(fourthUser.expected.score);
      //       expect(res.body.data.have_both_users_joined).to.equal(fourthUser.expected.have_both_users_joined);
      //       done();
      //     });
      // });

    });
  });
});


// it('It should allow a Second User to sign up and link to an existing Couple by referencing an existing User\'s email', function(done) {
//   request
//     .post('/api/v1/users/add')
//     .send(user)
//     .expect(httpStatus.OK)
//     .end(function(err, res) {
//       if (err) return done(err);
//       expect(res.body.success).to.equal(true);
//       expect(res.body.data.email).to.equal(user.email.toLowerCase());
//       expect(res.body.data.first_name).to.equal(user.first_name.toLowerCase());
//       expect(res.body.data.last_name).to.equal(user.last_name.toLowerCase());
//       expect(res.body.data.password).to.equal(undefined);
//       expect(res.body.data.couple_id).to.equal(1);
//       expect(res.body.data.user_id).to.equal(1);
//       expect(res.body.data.score).to.equal(0);
//       // Add to account for other properties returning on couple e.g. couple scores
//       done();
//     });
// });


// const user = Object.assign({}, mockUsers.firstUserOfCouple);
// it('It should allow a Second User to sign up and link to an existing Couple by referencing an existing User\'s email', function(done) {
//   request
//     .post('/api/v1/users/add')
//     .send(user)
//     .expect(httpStatus.OK)
//     .end(function(err, res) {
//       if (err) return done(err);
//       expect(res.body.success).to.equal(true);
//       expect(res.body.data.email).to.equal(user.email.toLowerCase());
//       expect(res.body.data.first_name).to.equal(user.first_name.toLowerCase());
//       expect(res.body.data.last_name).to.equal(user.last_name.toLowerCase());
//       expect(res.body.data.password).to.equal(undefined);
//       expect(res.body.data.couple_id).to.equal(1);
//       expect(res.body.data.user_id).to.equal(1);
//       expect(res.body.data.score).to.equal(0);
//       // Add to account for other properties returning on couple e.g. couple scores
//       done();
//     });
// });



//     it('It should add a new User and create a new linked Couple', function(done) {
//       request
//         .post('/api/v1/users/add')
//         .send(user)
//         .expect(httpStatus.OK)
//         .end(function(err, res) {
//           if (err) return done(err);
//           expect(res.body.success).to.equal(true);
//           expect(res.body.data.email).to.equal(user.email.toLowerCase());
//           expect(res.body.data.first_name).to.equal(user.first_name.toLowerCase());
//           expect(res.body.data.last_name).to.equal(user.last_name.toLowerCase());
//           expect(res.body.data.password).to.equal(undefined);
//           expect(res.body.data.couple_id).to.equal(1);
//           expect(res.body.data.user_id).to.equal(1);
//           expect(res.body.data.score).to.equal(0);
//           // Add to account for other properties returning on couple e.g. couple scores
//           done();
//         });
//     });
//   });
// });


//   describe('Add firstUserOfCouple', function() {
//     it('should return a HTTP 200 response', function(done) {
//       request(app)
//         .post('/api/v1/users/add')
//         .send(user)
//         .expect(httpStatus.OK)
//         // is the below part needed? 
//         .end(function(err, res) {
//           if (err) return done(err);
//           it('should respond with a success value of true', function(done) {
//             expect(res.body.success).to.equal(true);
//             done();
//           });
//           it('should have true be true, see if this works', function(done) {
//             expect(true).to.equal(true);
//             done();
//           });
//         });
//     });
//   });
// });

// it('should add a new User and generate a new linked Couple', (done) => {
//   request(app)
//     .post('/api/v1/users/add')
//     .send(user)
//     .expect(httpStatus.OK)
//     .end((err, res) => {
//       if (err) return done(err);
//       // expect(res.body.success).to.equal(true);
//       // expect(res.body.data.email).to.equal(user.email.toLowerCase());
//       done();
//     });
// });
// it('should create a new User and a new linked Couple', (done) => {
//   const user = Object.assign({}, mockUsers.firstUserOfCouple);
//   request(app)
//     .post('/api/v1/users/add')
//     .send(user)
//     // .expect(httpStatus.OK)
//     .end((err, res) => {
//       if (err) return done(err);
//       expect(res.body.success).to.equal(true);
//       // expect(res.body.data.email).to.equal(user.email.toLowerCase());
//       done();
//     });
// });


// });

// describe('# GET /api/users/:userId', () => {
//   it('should get user details', (done) => {
//     request(app)
//       .get(`/api/users/${user._id}`)
//       .expect(httpStatus.OK)
//       .then(res => {
//         expect(res.body.username).to.equal(user.username);
//         expect(res.body.mobileNumber).to.equal(user.mobileNumber);
//         done();
//       });
//   });

//   it('should report error with message - Not found, when user does not exists', (done) => {
//     request(app)
//       .get('/api/users/56c787ccc67fc16ccc1a5e92')
//       .expect(httpStatus.NOT_FOUND)
//       .then(res => {
//         expect(res.body.message).to.equal('Not Found');
//         done();
//       });
//   });
// });


// describe('# GET /api/v1/users/', () => {
//   it('should get all users', (done) => {
//     request(app)
//       .get('/api/users')
//       .expect(httpStatus.OK)
//       .then(res => {
//         expect(res.body).to.be.an('array');
//         done();
//       });
//   });
// });


// describe('# PUT /api/users/:userId', () => {
//   it('should update user details', (done) => {
//     user.username = 'KK';
//     request(app)
//       .put(`/api/users/${user._id}`)
//       .send(user)
//       .expect(httpStatus.OK)
//       .then(res => {
//         expect(res.body.username).to.equal('KK');
//         expect(res.body.mobileNumber).to.equal(user.mobileNumber);
//         done();
//       });
//   });
// });

// describe('# DELETE /api/users/', () => {
//   it('should delete user', (done) => {
//     request(app)
//       .delete(`/api/users/${user._id}`)
//       .expect(httpStatus.OK)
//       .then(res => {
//         expect(res.body.username).to.equal('KK');
//         expect(res.body.mobileNumber).to.equal(user.mobileNumber);
//         done();
//       });
//   });
// });
// });
