import axios from 'axios';
import { MARK_ANSWERED, FETCH_QUESTIONS } from '../constants/types';
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

/*
THis is how we get the data from the DB
export const getQuestions = () => {
  return dispatch => {
    axios.get(`${apiUrl}/api/v1/questions`)
    .then(response => {
      dispatch({
        type: FETCH_QUESTIONS,
        payload: response.data,
      });
    });
  };
};
*/

export const postResponse = ({ friendsFamily, finances, pastRelationships, lifePicture, celebrate }) => {
  return (dispatch) => {
    axios.post(`${apiUrl}/questions/answered`, { friendsFamily, finances, pastRelationships, lifePicture, celebrate })
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