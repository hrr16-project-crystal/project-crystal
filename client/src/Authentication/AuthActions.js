// When we call an action creator it returns an action
// Actions get piped into the dispatch method (funnel)
// Dispatch method makes sure the action gets sent to all middleware and then reducers
// Redux thunk gives very direct access to dispatch
import axios from 'axios';
const apiUrl = 'http://localhost:3000';

export const signinUser = ({ email, password }) => {
  // This is how we get direct access to dispatch method
  // Becuase of redux-thunk we can return a function instead of an object
  // we can then call the dispatch method at any time to dispatch our own actions
  // Purpose of redux-thunk is dispatch multiple different actions inside an action creator
  return (dispatch) => {
    // Submit email/password to the server
    // email => email: email && password => password: password
    axios.post(`${apiUrl}/signin`, { email, password });
    // Check if request is good
      // if good, update the state to indicate the user is authenticated
      // Save the JWT token
      // Redirect to the dashboard
      // Otherwise, show an error to the user
  };
};
