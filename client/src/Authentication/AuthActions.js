// Actions get piped into the dispatch method (funnel)
// Dispatch method makes sure the action gets sent to all middleware and then reducers
// Redux thunk gives very direct access to dispatch
import axios from 'axios';
// browserHistory can be used to make changes to the URL for programmatic navigation
import { browserHistory } from 'react-router';
import { AUTH_USER, AUTH_ERROR, UNAUTH_USER, FETCH_MESSAGE } from '../constants/types';
const apiUrl = 'http://localhost:3000';

// Pass a string and it will send an error message to all components
export const authError = error => {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
};

// Whenever we call signinUser we are going to return a function that is auto called by
// redux-thunk middleware and it gets called with the dispatch method
export const signinUser = ({ email, password }) => {
  // This is how we get direct access to dispatch method
  // Becuase of redux-thunk we can return a function instead of an object
  // we can then call the dispatch method at any time to dispatch our own actions
  // Purpose of redux-thunk is dispatch multiple different actions inside an action creator
  return (dispatch) => {
    // Submit email/password to the server
    // email => email: email && password => password: password
    axios.post(`${apiUrl}/signin`, { email, password })
    // if request is good,
    .then(response => {
      // update the state to indicate the user is authenticated
      // because of redux we have direct access to the dispatch method
      // This is equivalent to calling an action creator and return an object as an action
      dispatch({ type: AUTH_USER, payload: response.data.user });
      // Save the JWT token to localStorage's token key
      localStorage.setItem('token', response.data.token);
      // Redirect to the dashboard
      browserHistory.push('/dashboard');
    })
    .catch(() => {
      // Otherwise, show an error to the user
      dispatch(authError('Bad Login Info'));
    });
  };
};


export const signoutUser = () => {
  localStorage.removeItem('token');
  // Can remove this line below to redirect to Signout component to display marketing message
  browserHistory.push('/');

  return { type: UNAUTH_USER };
};

export const signupUser = ({ firstName, lastName, email, password, couple }) => {
  return (dispatch) => {
    axios.post(`${apiUrl}/signup`, { firstName, lastName, email, password, couple })
    .then(response => {
      console.log('==============');
      console.log(response.data);
      console.log('==============');
      dispatch({ type: AUTH_USER, payload: response.data.user });
      localStorage.setItem('token', response.data.token);
      browserHistory.push('/quiz');
    })
    .catch(response => {
      dispatch(authError(response.data.error));
    });
  };
};

export const fetchMessage = () => {
  return (dispatch) => {
    axios.get(apiUrl, {
      headers: { authorization: localStorage.getItem('token') },
    })
    .then(response => {
      dispatch({
        type: FETCH_MESSAGE,
        payload: response.data.message,
      });
    });
  };
};

export const facebookLogin = () => {
  return dispatch => {
    axios.get('/auth/facebook')
    .then(response => {
      dispatch({ type: AUTH_USER });
      console.log(response);
      browserHistory.push('/dashboard');
    })
    .catch(response => {
      console.log(response);
      dispatch(authError(response.data.error));
    });
  };
};
