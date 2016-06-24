import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from '../../Components/Authentication/authReducer';
import quizReducer from '../../Components/Quiz/quizReducer';
import meterReducer from '../../Components/Meter/meterReducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  quiz: quizReducer,
  meter: meterReducer,
});

export default rootReducer;
