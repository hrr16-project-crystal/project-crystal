import axios from 'axios';
import { MARK_ANSWERED, FETCH_QUESTIONS } from '../constants/types';
import { browserHistory } from 'react-router';
const apiUrl = 'http://localhost:3000';

export const getQuestions = () => {
  return dispatch => {
    axios.get(`${apiUrl}/questions`)
    .then(response => {
      dispatch({
        type: FETCH_QUESTIONS,
        payload: response.data,
      });
    });
  };
};

export const postResponse = ({ hug, kiss }) => {
  return (dispatch) => {
    axios.post(`${apiUrl}/questions/answered`, { hug, kiss })
      .then(response => {
        console.log(response);
        dispatch({ type: MARK_ANSWERED });
        browserHistory.push('/dashboard');
      })
      .catch(response => {
        console.log(response);
      });
  };
};
