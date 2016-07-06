import { FITBIT_AUTH_TOKEN, PARTNER_ACCESS_TOKEN } from '../../helpers/constants/types';
import axios from 'axios';
const apiUrl = 'http://localhost:9000/api/v1';

export const fitbitAccessToken = userID => {
  return dispatch => {
    axios.get(`${apiUrl}/users/${userID}`)
    .then(response => {
      dispatch({
        type: FITBIT_AUTH_TOKEN,
        payload: response.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
  };
};

export const partnerFitbitAccessToken = coupleID => {
  return dispatch => {
    axios.get(`${apiUrl}/couples/both/${coupleID}`)
    .then(response => {
      dispatch({
        type: PARTNER_ACCESS_TOKEN,
        payload: response.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
  };
};
