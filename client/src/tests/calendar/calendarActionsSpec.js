import { expect } from '../testHelper';
import { fetchEvents, createEvent, deleteEvent } from '../../components/Calendar/calendarActions';
import { FETCH_EVENTS, CREATE_EVENT, DELETE_EVENT } from '../../helpers/constants/types';
import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import thunk from 'redux-thunk';
const apiUrl = 'http://localhost:9000/api/v1';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Calendar Actions -- Async', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should fetch all events', done => {
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
    }, 100);
  });

  it('creates a new event for the couple', done => {
    nock(apiUrl)
    .post('/events/add', {
      title: 'New Event',
      start: '2016-07-01T21:47:04.757Z',
      end: '2016-07-01T21:47:08.888Z',
      category: 'Dinner',
      description: 'Test Description...',
      coupleID: 1,
    })
    .reply(200, {
      event_id: 8,
      title: 'New Event',
      start_date: '2016-07-01T21:47:04.757Z',
      end_date: '2016-07-01T21:47:08.888Z',
      category: 'Dinner',
      description: 'Test Description...',
      couple_id: 1,
    });

    const expectedActions = [
      { type: CREATE_EVENT, payload: {
        title: 'New Event',
        start_date: '2016-07-01T21:47:04.757Z',
        end_date: '2016-07-01T21:47:08.888Z',
        event_id: 8,
        category: 'Dinner',
        description: 'Test Description...',
        couple_id: 1,
      } },
    ];
    const store = mockStore({ event: {} });
    store.dispatch(createEvent({
      title: 'New Event',
      start: '2016-07-01T21:47:04.757Z',
      end: '2016-07-01T21:47:08.888Z',
      category: 'Dinner',
      description: 'Test Description...',
      coupleID: 1,
    }));
    setTimeout(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    }, 100);
  });

  it('should delete a single event', done => {
    nock(apiUrl)
    .delete('/events/delete/1')
    .reply(200, {
      event_id: 1,
      title: 'New Event',
      start_date: '2016-07-01T21:47:04.757Z',
      end_date: '2016-07-01T21:47:08.888Z',
      category: 'Dinner',
      description: 'Test Description...',
      couple_id: 1,
    });

    const expectedActions = [
      { type: DELETE_EVENT, payload: {
        event_id: 1,
        title: 'New Event',
        start_date: '2016-07-01T21:47:04.757Z',
        end_date: '2016-07-01T21:47:08.888Z',
        category: 'Dinner',
        description: 'Test Description...',
        couple_id: 1,
      } },
    ];

    const store = mockStore({ event: {} });
    store.dispatch(deleteEvent(1));
    setTimeout(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    }, 100);
  });
});
