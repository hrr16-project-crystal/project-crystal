import { CREATE_EVENT, FETCH_EVENTS } from '../../helpers/constants/types';
import axios from 'axios';
const apiUrl = 'http://localhost:3000/api/v1';
// const testAPI = 'http://localhost:3000';

export const fetchEvents = (coupleID) => {
  return dispatch => {
    axios.get(`${apiUrl}/events/${coupleID}`)
    .then(response => {
      dispatch({
        type: FETCH_EVENTS,
        payload: response.data,
      });
    });
  };
};

export const createEvent = ({ title, start, end, category, description, coupleID }) => {
  return dispatch => {
    axios.post(`${apiUrl}/events/add`,
      { title, start, end, category, description, coupleID })
    .then(response => {
      console.log('IN THE CAL ACTIONS')
      console.log(response)
      dispatch({
        type: CREATE_EVENT,
        payload: response.data,
      });
    });
  };
};
