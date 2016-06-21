import axios from 'axios';
import { FETCH_HEALTH } from '../constants/types';
import { browserHistory } from 'react-router';
const apiUrl = 'http://localhost:3000';

export const getHealth = () => {
  return dispatch => {
    axios.get(`${apiUrl}/health`)
      .then(response => {
        dispatch({
          type: FETCH_HEALTH,
          payload: response.data,
        });
      });
  };
};
