import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from '../Authentication/authReducer';
import quizReducer from '../Quiz/quizReducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  quiz: quizReducer,
});

export default rootReducer;
