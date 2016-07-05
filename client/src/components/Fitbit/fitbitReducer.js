import { AUTH_FITBIT, FETCH_STATS } from '../../helpers/constants/types';

export default (state = {}, action) => {
  switch (action.type) {
    case AUTH_FITBIT:
      // Connect state.calendar.event with result of the createEvent action
      return { ...state, approved: true };
    case FETCH_STATS:
      // Connect state.calendar.events with result of the fetchEvent action
      return { ...state, stats: action.payload };
  }
  return state;
}