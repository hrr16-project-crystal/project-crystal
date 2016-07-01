import { expect } from '../testHelper';
import { CREATE_EVENT, FETCH_EVENTS } from '../../helpers/constants/types';
import calendarReducer from '../../components/Calendar/calendarReducer';

describe('Calendar Reducer', () => {
  it('should return an empty object as the default state', () => {
    const newState = calendarReducer(undefined, { type: 'unknown' });
    expect(newState).to.eql({});
  });

  it('should handle action of type FETCH_EVENTS', () => {
    const action = { type: FETCH_EVENTS, payload: 'all events' };
    expect(calendarReducer({}, action)).to.eql({ events: 'all events' });
  });

  it('should handle action of type CREATE_EVENT', () => {
    const action = { type: CREATE_EVENT, payload: 'new event' };
    expect(calendarReducer({}, action)).to.eql({ event: 'new event' });
  });
});
