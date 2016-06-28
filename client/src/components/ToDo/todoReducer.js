import { FETCH_TODOS, ADDED_TODO, DELETED_TODO } from '../../helpers/constants/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return { ...state, fetchTodos: action.payload };
    case ADDED_TODO:
      return { ...state, fetchTodos: action.payload };
    case DELETED_TODO:
      return { ...state, deleteTodos: action.payload };
  }
  return state;
}