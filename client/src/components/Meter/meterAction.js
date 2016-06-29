import axios from 'axios';
import { FETCH_HEALTH } from '../../helpers/constants/types';
const apiUrl = 'http://localhost:3000/api/v1';

export const getHealth = (coupleID) => {
  return dispatch => {
    console.log('======METERACTION=====')
    console.log(coupleID)
    axios.get(`${apiUrl}/couples/${coupleID}`)
      .then(response => {
        console.log('==== THEN RESPONSE IN M ACTIONS')
        console.log(response)
        dispatch({
          type: FETCH_HEALTH,
          payload: response.data,
        });
      });
  };
};
