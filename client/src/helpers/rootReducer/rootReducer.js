import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from '../../components/Authentication/authReducer';
import quizReducer from '../../components/Quiz/quizReducer';
import meterReducer from '../../components/Meter/meterReducer';
import calendarReducer from '../../components/Calendar/calendarReducer';
import messageReducer from '../../components/Chat/messageReducer';
import todoReducer from '../../components/ToDo/todoReducer';
import dateNightReducer from '../../components/DateNight/dateNightReducer';
import buckReducer from '../../components/LoveBucks/buckReducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  quiz: quizReducer,
  meter: meterReducer,
  calendar: calendarReducer,
  messages: messageReducer,
  todo: todoReducer,
  yelp: dateNightReducer,
  lovebucks: buckReducer,
});

export default rootReducer;

