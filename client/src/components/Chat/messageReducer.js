import {combineReducers} from 'redux';
import {IS_TYPING, JOINED_ROOM, ADD_MESSAGE, GET_MESSAGES}  from '../../helpers/constants/types';

export default (state = {messages:[],typing:false,joined:false,}, action) => {
  switch (action.type) {
    case IS_TYPING: 
      return {...state, typing: action.data};
    case JOINED_ROOM: 
      return {...state, joined: action.data};
    case ADD_MESSAGE:
      let holder = state.messages.slice();
      holder.push(action.data)
      return {...state, messages: holder};
    case GET_MESSAGES:
      return {...state, messages: action.payload};
    default: return state;
  }
  return state;
};