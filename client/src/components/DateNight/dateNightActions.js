import axios from 'axios';
const apiUrl = 'http://localhost:3000/api/v1';
import { YELP_REQUEST } from '../../helpers/constants/types';

export const getRestaurants = city => {
  return dispatch => {
    axios.post(`${apiUrl}/yelp/${city}`)
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

