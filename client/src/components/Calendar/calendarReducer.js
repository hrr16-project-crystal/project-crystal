import { CREATE_EVENT, FETCH_EVENTS } from '../../helpers/constants/types';

export default (state = {}, action) => {
  switch (action.type) {
    case CREATE_EVENT:
      // Connect state.calendar.event with result of the createEvent action
      return { ...state, event: action.payload };
    case FETCH_EVENTS:
      // Connect state.calendar.events with result of the fetchEvent action
      return { ...state, events: action.payload };
  }
  return state;
}