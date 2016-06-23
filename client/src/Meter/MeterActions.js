import axios from 'axios';
import { FETCH_HEALTH } from '../constants/types';
import { browserHistory } from 'react-router';
const apiUrl = 'http://localhost:3000/api/v1';

export const getHealth = () => {
  return dispatch => {
    axios.get(`${apiUrl}/couples/4`)
      .then(response => {
        console.log('METER ACTIONS');
        console.log(response);
        dispatch({
          type: FETCH_HEALTH,
          payload: response.data,
        });
      });
  };
};
