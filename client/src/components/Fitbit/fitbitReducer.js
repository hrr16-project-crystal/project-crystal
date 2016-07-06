import { FITBIT_AUTH_TOKEN, FETCH_ACTIVITY_STATS } from '../../helpers/constants/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FITBIT_AUTH_TOKEN:
      // Connect state.calendar.event with result of the createEvent action
      return { ...state, accessToken: action.payload };
    case FETCH_ACTIVITY_STATS:
      // Connect state.calendar.events with result of the fetchEvent action
      return { ...state, activity: action.payload };
  }
  return state;
}