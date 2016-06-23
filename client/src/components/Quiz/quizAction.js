import axios from 'axios';
import { MARK_ANSWERED, FETCH_QUESTIONS } from '../../helpers/constants/types';
import { browserHistory } from 'react-router';

export const getQuestions = () => {
  return dispatch => {
    axios.get('/api/v1/questions/initial')
    .then(response => {
      dispatch({
        type: FETCH_QUESTIONS,
        payload: response.data,
      });
    });
  };
};


export const postResponse = ({ Respect, Communication, Spontaneity, Intimacy, Generosity, Total, user_id }) => {
  return dispatch => {
    axios.post('/api/v1/couples/answers',
      { Respect, Communication, Spontaneity, Intimacy, Generosity, Total, user_id })
      .then(response => {
        dispatch({ type: MARK_ANSWERED });
        browserHistory.push('/dashboard');
      })
      .catch(response => {
        console.log(response);
      });
  };
};
