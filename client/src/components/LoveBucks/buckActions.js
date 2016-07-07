import axios from 'axios';
import { ADD_TRANSACTION, CHANGE_POINTS, GET_LOVEBUCK_INFO, } from '../../helpers/constants/types';

export const givePoints = (giftInfo) => {
  if (giftInfo.type === 1) giftInfo.points = -Math.abs(giftInfo.points);
  return dispatch => {
    axios.post('/api/v1/lovebucks', giftInfo)
      .then(response => {
        console.log('added',response);
        dispatch({
          type: ADD_TRANSACTION,
          payload: response.data.updated.love_bucks,
        });
      });
  };
};

export const getLovebuckInfo = (coupleID) => {
  return dispatch => {
    axios.get(`/api/v1/lovebucks/${coupleID}`)
      .then(response => {
        dispatch({
          type: GET_LOVEBUCK_INFO,
          payload: response.data.data,
        });
      });
  };
};
