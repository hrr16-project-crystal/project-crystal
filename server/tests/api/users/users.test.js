'use strict';
const httpStatus = require('http-status');
const chai = require('chai');
const expect = chai.expect;
const app = require(__dirname + '/../../../server');
const mockUsers = require(__dirname + '/mockData.js');
const each = require('lodash/each');
const request = require('supertest')('http://localhost:3000');
const map = require('lodash/map');
const omit = require('lodash/omit');
// chai.config.includeStack = true;  =>  if want to display stack trace

describe('## User APIs', function() {

  describe('-- Webpack loading... --', function() {
    before(function(done) {
      // RF: Do DB or table drops on app initialisation
      // RF: Need alternative to setTimeout in before hook, to account for loadtime.  
      setTimeout(() => { done(); }, 1800);
    });

    // URGENT RF: Include in tests DB queries to ensure that DB also correctly reflects expected state after
    // test operations
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
            expect(res.body.data).to.be.an('object');
            expect(res.body.data).to.deep.equals(firstUser.expected);
            done();
          });
      });

      it('It should NOT allow a subsequent user to sign up with the same email, even where the email is in a different case', function(done) {
        const firstUserWithUpperCasedEmail = Object.assign(mockUsers.firstUserOfCouple, { email: mockUsers.firstUserOfCouple.email.toUpperCase() });
        request
          .post('/api/v1/users/add')
          .send(firstUserWithUpperCasedEmail)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.body.success).to.equal(false);
            expect(res.body.data).to.be.a('string');
            done();
          });
      });

      it('It should allow a second User to sign up and link to an existing, incomplete Couple by referencing an existing User\'s email', function(done) {
        const secondUser = Object.assign({}, mockUsers.secondUserOfCouple);
        request
          .post('/api/v1/users/add')
          .send(secondUser)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.body.success).to.equal(true);
            expect(res.body.data).to.be.an('object');
            expect(res.body.data).to.deep.equals(secondUser.expected);
            done();
          });
      });

      it('It should NOT allow a third User to sign up and link to an existing, complete Couple by referencing an existing User\'s email', function(done) {
        const stranger = Object.assign({}, mockUsers.stranger);
        request
          .post('/api/v1/users/add')
          .send(stranger)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.body.success).to.equal(false);
            expect(res.body.data).to.be.a('string');
            done();
          });
      });

      it('It should allow a third User to sign up and should generate a second, new, linked Couple', function(done) {
        const thirdUser = Object.assign({}, mockUsers.firstUserOfCouple2);
        request
          .post('/api/v1/users/add')
          .send(thirdUser)
          .expect(httpStatus.OK)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.body.success).to.equal(true);
            expect(res.body.data).to.be.an('object');
            expect(res.body.data).to.deep.equals(thirdUser.expected);
            done();
          });
      });

      it('It should allow a fourth User to sign up and link to the second existing, incomplete Couple by referencing the third User\'s email', function(done) {
        const fourthUser = Object.assign({}, mockUsers.secondUserOfCouple2);
        request
          .post('/api/v1/users/add')
          .send(fourthUser)
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.body.success).to.equal(true);
            expect(res.body.data).to.be.an('object');
            expect(res.body.data).to.deep.equals(fourthUser.expected);
            done();
          });
      });
      // add aditional POST tests here 
    });

    describe('# GET /api/v1/users', function() {
      it('It should get all existing Users', function(done) {
        request
          .get('/api/v1/users')
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.body.success).to.equal(true);
            expect(res.body.data).to.be.instanceof(Array);
            expect(res.body.data).to.have.lengthOf(4);
            // convert current mock User data expected values post POST operations and 
            // convert all mock Users data to an expected array of Users
            const expectedUsers = map(omit(mockUsers, ['stranger']), function(mockUser) {
              mockUser.expected.have_both_users_joined = true;
              return mockUser.expected;
            });
            expect(res.body.data).to.deep.include.members(expectedUsers);
            done();
          });
      });

      it('It should get user #2\'s User record', function(done) {
        const secondUser = Object.assign({}, mockUsers.secondUserOfCouple);
        request
          .get('/api/v1/users/2')
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.body.success).to.equal(true);
            expect(res.body.data).to.be.an('object');
            expect(res.body.data).to.deep.equals(secondUser.expected);
            done();
          });
      });

      it('It should get user #4\'s User record', function(done) {
        const fourthUser = Object.assign({}, mockUsers.secondUserOfCouple2);
        request
          .get('/api/v1/users/4')
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.body.success).to.equal(true);
            expect(res.body.data).to.be.an('object');
            expect(res.body.data).to.deep.equals(fourthUser.expected);
            done();
          });
      });

      it('It should NOT get non-existing user #999\'s User record', function(done) {
        request
          .get('/api/v1/users/999')
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.body.success).to.equal(false);
            expect(res.body.data).to.be.a('string');
            done();
          });
      });

      // add aditional tests to GET test suite here

    });

    // describe('# GET /api/v1/users', function() {
    //   it('It should get all existing Users', function(done) {
    //     request
    //       .get('/api/v1/users')
    //       .end(function(err, res) {
    //         if (err) return done(err);
    //         expect(res.body.success).to.equal(true);
    //         expect(res.body.data).to.be.instanceof(Array);
    //         expect(res.body.data).to.have.lengthOf(4);
    //         // convert current mock User data expected values post POST operations and 
    //         // convert all mock Users data to an expected array of Users
    //         const expectedUsers = map(omit(mockUsers, ['stranger']), function(mockUser) {
    //           mockUser.expected.have_both_users_joined = true;
    //           return mockUser.expected;
    //         });
    //         expect(res.body.data).to.deep.include.members(expectedUsers);
    //         done();
    //       });
    //   });
    // });
    // add aditional describe/test groups here (e.g. DELETE); 
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
