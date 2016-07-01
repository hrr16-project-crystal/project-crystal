import { expect } from '../testHelper';
import { fetchEvents } from '../../components/Calendar/calendarActions';
import { FETCH_EVENTS } from '../../helpers/constants/types';
import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import thunk from 'redux-thunk';
const apiUrl = 'http://localhost:3000/api/v1';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('creates FETCH_EVENTS when fetching events has been done', function (done) {
    nock(apiUrl)
      .get('/events/1')
      .reply(200, { events: [
        { title: 'event1' }, { title: 'event2' }, { title: 'event3' },
      ] });

    const expectedActions = [
      { type: FETCH_EVENTS, payload: { events: [
        { title: 'event1' }, { title: 'event2' }, { title: 'event3' },
      ] } },
    ];

    const store = mockStore({ events: [] });
    store.dispatch(fetchEvents(1));

    setTimeout(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    }, 1900);
  });
});
