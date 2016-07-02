import { expect } from '../testHelper';
import { signupUser, signinUser } from '../../components/Authentication/authAction';
import { AUTH_USER, AUTH_ERROR } from '../../helpers/constants/types';
import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import thunk from 'redux-thunk';
const apiUrl = 'http://localhost:3000';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Auth Actions -- Async', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should signup a user', done => {
    nock(apiUrl)
      .post('/signup', {
        firstName: 'Mike',
        lastName: 'Cruz',
        email: 'mike@test.com',
        password: 'pass',
        couple: 'yes',
        otherEmail: undefined,
      })
      .reply(200, {
        firstName: 'Mike',
        lastName: 'Cruz',
        email: 'mike@test.com',
        password: 'pass',
        couple: 'yes',
        user_id: 1,
      });

    const expectedActions = [
      { type: AUTH_USER, payload: {
        firstName: 'Mike',
        lastName: 'Cruz',
        email: 'mike@test.com',
        password: 'pass',
        couple: 'yes',
        user_id: 1,
      } },
    ];

    const store = mockStore({ user: {} });
    store.dispatch(signupUser({
      firstName: 'Mike',
      lastName: 'Cruz',
      email: 'mike@test.com',
      password: 'pass',
      couple: 'yes',
      otherEmail: undefined,
    }));
    setTimeout(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    }, 100);
  });

  it('should deny access with bad credentials', done => {
    nock(apiUrl)
    .post('/signin', {
      email: 'mike@test.com',
      password: 'pass',
      coupleID: 1,
    })
    .reply(200, {
      user_id: 3,
      first_name: 'Mike',
      last_name: 'Cruz',
      email: 'mike@test.com',
      password: 'pass',
      couple_id: 3,
    });

    const expectedActions = [
      { type: AUTH_ERROR, payload: 'Bad Login Info' },
    ];
    const store = mockStore({ user: {} });
    store.dispatch(signinUser({
      email: 'mike@test.com',
      password: 'pass',
      coupleID: 1,
    }));
    setTimeout(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    }, 100);
  });
});
