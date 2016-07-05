import axios from 'axios';
import { YELP_REQUEST } from '../../helpers/constants/types';

export const getRestaurants = city => {
  return dispatch => {
    axios.post(`/api/v1/yelp/${city}`)
    .then(response => {
      dispatch({
        type: YELP_REQUEST,
        payload: response.data.businesses,
      })
    })
    .catch(response => {
      console.log('yelpRequest ERROR - RESPONSE:', response);
    });
  };
};

