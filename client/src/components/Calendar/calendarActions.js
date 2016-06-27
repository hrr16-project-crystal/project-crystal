import { CREATE_EVENT, FETCH_EVENTS } from '../../helpers/constants/types';
import axios from 'axios';
const apiUrl = 'http://localhost:3000/api/v1';
const testAPI = 'http://localhost:3000';

export const fetchEvents = () => {
  return dispatch => {
    axios.get(`${testAPI}/testevents`)
    .then(response => {
      dispatch({
        type: FETCH_EVENTS,
        payload: response.data,
      });
    });
  };
};

export const createEvent = ({ title, start, end, category, description }) => {
  return dispatch => {
    axios.post(`${testAPI}/createevent`,
      { title, start, end, category, description })
    .then(response => {
      dispatch({
        type: CREATE_EVENT,
        payload: response.data,
      });
    });
  };
};
