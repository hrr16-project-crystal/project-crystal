import axios from 'axios';
import { FETCH_HEALTH } from '../../helpers/constants/types';
import { browserHistory } from 'react-router';
const apiUrl = 'http://localhost:3000/api/v1';

export const getHealth = (coupleID) => {
  return dispatch => {
    axios.get(`${apiUrl}/couples/`+coupleID)
      .then(response => {
        dispatch({
          type: FETCH_HEALTH,
          payload: response.data,
        });
      });
  };
};
