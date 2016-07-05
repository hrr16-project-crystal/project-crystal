import { CREATE_EVENT, FETCH_EVENTS, DELETE_EVENT } from '../../helpers/constants/types';
import axios from 'axios';

// Get all events for each couple
export const fetchEvents = (coupleID) => {
  return dispatch => {
    axios.get(`/api/v1/events/${coupleID}`)
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
    axios.post('/api/v1/events/add',
      { title, start, end, category, description, coupleID })
    .then(response => {
      dispatch({
        type: CREATE_EVENT,
        payload: response.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
  };
};

// Delete a single event
export const deleteEvent = (eventID) => {
  return dispatch => {
    axios.delete(`/api/v1/events/delete/${eventID}`)
    .then(response => {
      dispatch({
        type: DELETE_EVENT,
        payload: response.data,
      });
    });
  };
};
