import { expect } from '../testHelper';
import { fetchEvents } from '../../components/Calendar/calendarActions';
import { FETCH_EVENTS } from '../../helpers/constants/types';

describe('calendar actions', () => {
  describe('fetchEvents', () => {
    it('should have the correct type', () => {
      const action = fetchEvents();
      expect(action.type).to.equal(FETCH_EVENTS);
    });
  });
});
