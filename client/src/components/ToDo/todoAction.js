import axios from 'axios';
import { FETCH_TODOS, ADDED_TODO, DELETED_TODO } from '../../helpers/constants/types';

export const deleteTodo = (todoID) => {
  return dispatch => {
    axios.delete(`api/v1/todos/deleteTodo/${todoID}`)
    .then(response => {
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
    axios.get(`api/v1/todos/${coupleID}`)
    .then(response => {
      dispatch({
        type: FETCH_TODOS,
        payload: response.data,
      })
    })
    .catch(response => {
      console.log('getTodo ERROR - RESPONSE:', response);
    });
  };
};

export const postTodo = (newTodo) => {
  return dispatch => {
    axios.post(`api/v1/todos/addTodo`, newTodo)
    .then(response => {
      dispatch({
        type: ADDED_TODO,
        payload: response.data,
      })
    })
    .catch(response => {
    });
  };
};
