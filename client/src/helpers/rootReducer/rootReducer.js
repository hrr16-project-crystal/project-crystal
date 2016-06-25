import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from '../../components/Authentication/authReducer';
import quizReducer from '../../components/Quiz/quizReducer';
import meterReducer from '../../components/Meter/meterReducer';
import createEventReducer from '../../components/Calendar/createEventReducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  quiz: quizReducer,
  meter: meterReducer,
  event: createEventReducer,
});

export default rootReducer;
