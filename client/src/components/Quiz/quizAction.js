import axios from 'axios';
import { MARK_ANSWERED, FETCH_QUESTIONS } from '../../helpers/constants/types';
import { browserHistory } from 'react-router';
const apiUrl = 'http://localhost:3000/api/v1';

export const getQuestions = () => {
  return dispatch => {
    axios.get(`${apiUrl}/questions/initial`)
    .then(response => {
      dispatch({
        type: FETCH_QUESTIONS,
        payload: response.data,
      });
    });
  };
};

export const postResponse = ({ Respect, Communication, Spontaneity, Intimacy, Generosity, user_id }) => {
  return (dispatch) => {
    axios.post(`${apiUrl}/couples/answers`,
      { Respect, Communication, Spontaneity, Intimacy, Generosity, user_id })
      .then(response => {
        dispatch({ type: MARK_ANSWERED });
        browserHistory.push('/dashboard');
      })
      .catch(response => {
        console.log(response);
      });
  };
};
