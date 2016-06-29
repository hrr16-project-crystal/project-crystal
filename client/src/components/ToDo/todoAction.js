import axios from 'axios';
import { FETCH_TODOS, ADDED_TODO, DELETED_TODO } from '../../helpers/constants/types';
const apiUrl = 'http://localhost:3000/api/v1';

// export const dTodo = id => {
//   return {
//     type: 'DELETED_TODO',
//     id,
//   };
// };

export const deleteTodo = (todoId) => {
  console.log("action deleteTODO YAY!!", todoId);
  return dispatch => {
    axios.delete(`${apiUrl}/todos/deleteTodo`, todoId)
    .then(response => {
      console.log("response.data", response.data);
      dispatch({
        type: DELETED_TODO,
        payload: response.data,
      })
    })
    .catch(response => {
      console.log('ERROR - RESPONSE:', response);
    });
  };
};


export const getTodos = () => {
  return dispatch => {
    axios.get(`${apiUrl}/todos/getAll`)
    .then(response => {
      console.log("response.data", response.data);
      dispatch({
        type: FETCH_TODOS,
        payload: response.data,
      })
    })
    .catch(response => {
      console.log('ERROR - RESPONSE:', response);
    });
  };
};

export const postTodo = (formProps) => {
  console.log("action postTODO YAY!!", formProps);
  return dispatch => {
    axios.post(`${apiUrl}/todos/addTodo`, formProps)
    .then(response => {
      console.log(response.data);
      dispatch({
        type: ADDED_TODO,
        payload: response.data,
      })
    })
    .catch(response => {
      console.log('ERROR - RESPONSE:', response);
    });
  };
};



