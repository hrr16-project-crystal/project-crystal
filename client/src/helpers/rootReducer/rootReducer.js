import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from '../../components/Authentication/authReducer';
import quizReducer from '../../components/Quiz/quizReducer';
import meterReducer from '../../components/Meter/meterReducer';
import calendarReducer from '../../components/Calendar/calendarReducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  quiz: quizReducer,
  meter: meterReducer,
  calendar: calendarReducer,
});

export default rootReducer;
