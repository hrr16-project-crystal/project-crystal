import { CREATE_EVENT, FETCH_EVENTS, DELETE_EVENT } from '../../helpers/constants/types';
import axios from 'axios';
const apiUrl = 'http://localhost:3000/api/v1';

// Get all events for each couple
export const fetchEvents = (coupleID) => {
  return dispatch => {
    axios.get(`${apiUrl}/events/${coupleID}`)
    .then(response => {
      dispatch({
        type: FETCH_EVENTS,
        payload: response.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
  };
};

// Create a new event
export const createEvent = ({ title, start, end, category, description, coupleID }) => {
  return dispatch => {
    axios.post(`${apiUrl}/events/add`,
      { title, start, end, category, description, coupleID })
    .then(response => {
      dispatch({
        type: CREATE_EVENT,
        payload: response.data,
      });
    });
  };
};

// Delete a single event
export const deleteEvent = (eventID) => {
  return dispatch => {
    axios.delete(`${apiUrl}/events/delete/${eventID}`)
    .then(response => {
      dispatch({
        type: DELETE_EVENT,
        payload: response.data,
      });
    });
  };
};
