import { FITBIT_AUTH_TOKEN, PARTNER_ACCESS_TOKEN } from '../../helpers/constants/types';
import axios from 'axios';

export const fitbitAccessToken = userID => {
  return dispatch => {
    axios.get(`/api/v1/users/${userID}`)
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
    axios.get(`/api/v1/couples/both/${coupleID}`)
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
