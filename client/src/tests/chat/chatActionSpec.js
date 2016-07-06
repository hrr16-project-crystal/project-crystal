import { expect } from '../testHelper';
import { getMessages, addMessage } from '../../components/Chat/messageAction';
import { GET_MESSAGES, ADD_MESSAGE } from '../../helpers/constants/types';
import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import thunk from 'redux-thunk';
const apiUrl = 'api/v1';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('messageActions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  xit('dispatches GET_MESSAGES action after getting messages from api', function (done) {
    nock(apiUrl)
      .get('/message/1')
      .reply(200, {data: { messages: [
        {
          "message_id": 1,
          "user_id": 1,
          "couple_id": 1,
          "content": "test",
          "created_at": "2016-06-30T15:33:49.040Z",
          "updated_at": "2016-06-30T15:33:49.040Z",
          },
      ] }});

    const expectedActions = [
      { type: GET_MESSAGES, payload: { messages: [
        {
          "message_id": 1,
          "user_id": 1,
          "couple_id": 1,
          "content": "test",
          "created_at": "2016-06-30T15:33:49.040Z",
          "updated_at": "2016-06-30T15:33:49.040Z",
          },
      ] } },
    ];

    const store = mockStore({ messages: [] });
    store.dispatch(getMessages(1));

    setTimeout(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    }, 100);
  });

  it('dispatches ADD_MESSAGE action', function (done) {

    const expectedActions = [
      { type: ADD_MESSAGE, payload: 
        {
          cat: 23,
        } 
      },
    ];

    const store = mockStore({ messages: [{dog:24}] });
    store.dispatch(addMessage({cat: 23}));

    setTimeout(() => {
      expect(store.getActions()).to.eql(expectedActions);
      done();
    }, 100);
  });

});