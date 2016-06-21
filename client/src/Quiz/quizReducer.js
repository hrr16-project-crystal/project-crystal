import { FETCH_QUESTIONS, MARK_ANSWERED, } from '../constants/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_QUESTIONS:
      return { ...state, questions: action.payload };
    case MARK_ANSWERED:
      return { ...state, authenticated: false };
  }
  return state;
}
