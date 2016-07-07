import {combineReducers} from 'redux';
import {ADD_TRANSACTION, CHANGE_POINTS, GET_LOVEBUCK_INFO}  from '../../helpers/constants/types';

export default (state = { transactions:[], totalPoints: 0 }, action) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      // let update = state.transactions.filter(transaction => transaction.buck_id !== action.payload.buck_id);
      return {...state, totalPoints: action.payload};
    case GET_LOVEBUCK_INFO:
      return {...state, transactions: action.payload};
    default: return state;
  }
  return state;
};