import { expect } from '../testHelper';
import { AUTH_USER, UNAUTH_USER, AUTH_ERROR, FETCH_MESSAGE } from '../../helpers/constants/types';
import authReducer from '../../components/Authentication/authReducer';

describe('Auth Reducer', () => {
  // it('should return an empty object as the default state', () => {
  //   const newState = calendarReducer(undefined, { type: 'unknown' });
  //   expect(newState).to.eql({});
  // });

  it('should handle action of type AUTH_USER', () => {
    const action = { type: AUTH_USER, payload: { token: 'blah' } };
    expect(authReducer({}, action)).to.eql({
      error: '',
      authenticated: true,
      user: { token: 'blah' },
    });
  });

  it('should handle action of type UNAUTH_USER', () => {
    const action = { type: UNAUTH_USER, payload: 'blah' };
    expect(authReducer({}, action)).to.eql({ authenticated: false });
  });

  it('should handle action of type AUTH_ERROR', () => {
    const action = { type: AUTH_ERROR, payload: 'this is an error' };
    expect(authReducer({}, action)).to.eql({ error: 'this is an error' });
  });

  it('should handle action of type FETCH_MESSAGE', () => {
    const action = { type: FETCH_MESSAGE, payload: 'new message content' };
    expect(authReducer({}, action)).to.eql({ message: 'new message content' });
  });
});
