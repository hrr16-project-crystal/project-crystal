import axios from 'axios';
const apiUrl = 'http://localhost:3000/api/todo';

export const getTodos = () => {
  return dispatch => {
    axios.get(`${apiUrl}/gettodos`)
    .then(response => {
      dispatch({
        type: FETCH_TODOS,
        payload: response.data,
      })
    })
    .catch(response => {
      console.log('ERROR - RESPONSE BELOW', response);
    });
  };
};

export const postTodo = () => {
  return dispatch => {
    axios.post(`${apiUrl}/posttodo`, {})
    .then(response => {
      dispatch({
        type: ADDED_TODO,
      })
    })
    .catch(response => {
      console.log('ERROR - RESPONSE BELOW', response);
    });
  };
};