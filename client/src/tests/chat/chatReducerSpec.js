import { expect } from '../testHelper';
import { ADD_MESSAGE, GET_MESSAGES } from '../../helpers/constants/types';
import messageReducer from '../../components/Chat/messageReducer';

describe('Message Reducer', () => {
  xit('should return an object with an empty messages array as the default state', () => {
    const newState = messageReducer(undefined, { type: 'unknown' });
    expect(newState).to.eql({messages:[]});
  });

  xit('should handle action of type ADD_MESSAGE', () => {
    const action = { type: ADD_MESSAGE, payload: {content:'hello'} };
    expect(messageReducer({messages:[]}, action)).to.eql({ messages: [{content:'hello'}] });
  });

  it('should handle action of type CREATE_EVENT', () => {
    const action = { type: GET_MESSAGES, payload: [
      {content: 'wow'},
      {content: 'owo'},
    ] };
    expect(messageReducer({ messages:[
      {content: 'dog'},
      {content: 'cat'},
    ]}, action)).to.eql({ messages:[
      {content: 'wow'},
      {content: 'owo'},
    ] });
  });
});