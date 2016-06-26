import {combineReducers} from 'redux';
import {UPDATE_MESSAGE, ADD_MESSAGE, GET_MESSAGES}  from '../../helpers/constants/types';

export default (state = {messages:[]}, action) => {
  switch (action.type) {
    case UPDATE_MESSAGE:
      return {};
    case ADD_MESSAGE:
      let holder = state.messages.slice();
      holder.push(action.payload)
      return {...state, messages: holder};
    case GET_MESSAGES:
      return {...state, messages: action.payload};
    default: return state;
  }
  return state;
};