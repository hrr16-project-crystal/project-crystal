import axios from 'axios';
import { FETCH_HEALTH } from '../../helpers/constants/types';

export const getHealth = (coupleID) => {
  return dispatch => {
    axios.get(`/api/v1/couples/${coupleID}`)
      .then(response => {
        dispatch({
          type: FETCH_HEALTH,
          payload: response.data,
        });
      });
  };
};
