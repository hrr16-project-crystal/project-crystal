import { FETCH_TODOS, ADDED_TODO } from '../../helpers/constants/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_TODOS:
      return { ...state, todos: action.payload };
    case ADDED_TODO:
      return { ...state, todos: action.payload };
  }
  return state;
}