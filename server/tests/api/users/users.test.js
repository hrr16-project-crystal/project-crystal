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
const Users = require(__dirname + '/../../../db/index').db.users;
const Couples = require(__dirname + '/../../../db/index').db.couples;

// Note for rewrites: 
// mutations on mock Data appear to occur during sequential tests. 
// Can take advantage of this or not, but be consistent. 

// Refactor comment: Mimic final delete test as also ensures DB state reflects expectations. 
// But also ensure accounting for errors not caught (current last delete test does not use .catch); 

describe('## User APIs', function() {

  describe('-- Webpack loading... --', function() {
    before(function(done) {
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
            // test expected API response 
            expect(res.body.success).to.equal(true);
            expect(res.body.data).to.be.an('object');
            expect(res.body.data).to.deep.equals(firstUser.expected);
            // test database to ensure database state reflects API response
            Users.findById(firstUser.expected.user_id)
              .then(function(foundUser) {
                expect(omit(foundUser, ['password'])).to.deep.equals(firstUser.expected);
              })
              .then(function() {
                Couples.findById(firstUser.expected.couple_id)
                  .then(function(foundCouple) {
                    expect(foundCouple.couple_id).to.equal(firstUser.expected.couple_id);
                    expect(foundCouple.score).to.equal(firstUser.expected.score);
                    expect(foundCouple.have_both_users_joined).to.equal(false);
                    done();
                  });
              });
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

    describe('# GET /api/v1/users/:id', function() {
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

    describe('# DELETE /api/v1/users/:id', function() {
      it('It should delete user #2 and set linked Couple\'s have_both_users_joined back to false', function(done) {
        const expectedDeletedSecondUser = Object.assign({}, mockUsers.secondUserOfCouple);
        // update expected value to be returned
        expectedDeletedSecondUser.expected.have_both_users_joined = false;
        request
          .delete('/api/v1/users/2')
          .end(function(err, res) {
            if (err) return done(err);
            expect(res.body.success).to.equal(true);
            expect(res.body.data).to.be.an('object');
            expect(res.body.data).to.deep.equals(expectedDeletedSecondUser.expected);
            done();
          });
      });

      // RF: All tests should imitate below test group setup (testing database state using promises)
      it('It should delete user #1 and delete linked Couple record completely', function(done) {
        const firstUserToDelete = Object.assign({}, mockUsers.firstUserOfCouple);
        // update expected value to be returned, due to previous mutation 
        firstUserToDelete.expected.have_both_users_joined = false;

        request
          .delete('/api/v1/users/1')
          .end(function(err, res) {
            if (err) return done(err);
            // test expected API repsonse 
            expect(res.body.success).to.equal(true);
            expect(res.body.data).to.be.an('object');
            expect(res.body.data).to.deep.equals(firstUserToDelete.expected);
            // test database to ensure database state reflects API response
            Users.findById(firstUserToDelete.expected.user_id)
              .then(function(foundUser) {
                expect(foundUser).to.not.exist;
              })
              .then(Couples.findById(firstUserToDelete.expected.couple_id))
              .then(function(foundCouple) {
                expect(foundCouple).to.not.exist;
                done();
              });
          });
      });
      // add additional tests to DELETE test group here
    });
    // add aditional describe / test groups here (e.g. Update);
  });
});
