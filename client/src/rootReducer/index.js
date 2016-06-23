import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from '../Authentication/authReducer';
import quizReducer from '../Quiz/quizReducer';
import meterReducer from '../Meter/meterReducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  quiz: quizReducer,
  meter: meterReducer,
});

export default rootReducer;
