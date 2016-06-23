import {
  AUTH_USER,
  UNAUTH_USER,
  AUTH_ERROR,
  FETCH_MESSAGE,
} from '../constants/types';


export default (state = {}, action) => {
  switch (action.type) {
    case AUTH_USER:
      // if user is authenticated, set the authentication state equal to true
      return { ...state, error:'', authenticated: true, user: action.payload };
    case UNAUTH_USER:
      return { ...state, authenticated: false };
    case AUTH_ERROR:
      return { ...state, error: action.payload };
    case FETCH_MESSAGE:
    return { ...state, message: action.payload }
  }
  return state;
}