import axios from 'axios';
import { FETCH_TODOS, ADDED_TODO, DELETED_TODO } from '../../helpers/constants/types';
const apiUrl = 'http://localhost:3000/api/v1';

export const deleteTodo = (todoID) => {
  console.log('deleteTodo todoID', todoID);
  return dispatch => {
    axios.delete(`${apiUrl}/todos/deleteTodo/${todoID}`)
    .then(response => {
      console.log("response.data from deleteTodo", response.data);
      dispatch({
        type: DELETED_TODO,
        payload: response.data,
      })
    })
    .catch(response => {
      console.log('deleteTodo ERROR - RESPONSE:', response);
    });
  };
};

export const getTodos = (coupleID) => {
  return dispatch => {
    axios.get(`${apiUrl}/todos/${coupleID}`)
    .then(response => {
      dispatch({
        type: FETCH_TODOS,
        payload: response.data.data,
      })
    })
    .catch(response => {
    });
  };
};

export const postTodo = (newTodo) => {
  return dispatch => {
    axios.post(`${apiUrl}/todos/addTodo`, newTodo)
    .then(response => {
      dispatch({
        type: ADDED_TODO,
        payload: response.data.data,
      })
    })
    .catch(response => {
    });
  };
};
