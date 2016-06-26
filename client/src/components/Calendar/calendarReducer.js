import { CREATE_EVENT, FETCH_EVENTS } from '../../helpers/constants/types';

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_EVENT:
      return { ...state, event: action.payload };
    case FETCH_EVENTS:
      return { ...state, events: action.payload };
  }
  return state;
}