import { FITBIT_AUTH_TOKEN, PARTNER_ACCESS_TOKEN } from '../../helpers/constants/types';

export default (state = {firstTime: 'test'}, action) => {
  switch (action.type) {
    case FITBIT_AUTH_TOKEN:
      // Connect state.calendar.event with result of the createEvent action
      return { ...state, accessToken: action.payload };
    case PARTNER_ACCESS_TOKEN:
      // Connect state.calendar.events with result of the fetchEvent action
      return { ...state, partnerToken: action.payload };
  }
  return state;
}