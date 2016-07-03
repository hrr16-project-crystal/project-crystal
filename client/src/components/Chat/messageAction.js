import axios from 'axios';
import { IS_TYPING, ADD_MESSAGE, GET_MESSAGES } from '../../helpers/constants/types';

export const joinRoom = (info) => {
  return dispatch => {
    dispatch({
      type: info.type,
      data: info.data,
    });
  };
};

export const sendMessage = (info) => {
  return dispatch => {
    dispatch({
      type: info.type,
      data: info.data,
    });
  };
};

export const isTyping = (info) => {
  return dispatch => {
    dispatch({
      type: info.type,
      data: info.data,
    });
  };
};

export const stopTyping = () => {
  return dispatch => {
    dispatch({
      type: IS_TYPING,
      data: '',
    });
  };
};

export const addMessage = (message) => {
  return dispatch => {
    dispatch({
      type: ADD_MESSAGE,
      payload: message,
    });
  };
};

export const getMessages = (coupleID) => {
  return dispatch => {
    axios.get(`/api/v1/message/${coupleID}`)
      .then(response => {
        dispatch({
          type: GET_MESSAGES,
          payload: response.data.data,
        });
      });
  };
};
