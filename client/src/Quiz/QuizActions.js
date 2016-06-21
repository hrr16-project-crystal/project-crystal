import axios from 'axios';
import { MARK_ANSWERED, FETCH_QUESTIONS } from '../constants/types';
import { browserHistory } from 'react-router';
const apiUrl = 'http://localhost:3000';

// replace URL once available
// export function getQuestions() {
//   return (dispatch) => {
//     axios.get(`${apiUrl}/questions`)
//       .then(response => {
//         console.log(response);
//         dispatch({
//           type: FETCH_QUESTIONS,
//           payload: response.data.answers,
//           // contentType: 'application/json',
//           // success: questions => this.setState({ questions: questions })
//         });
//       });
//   };
// }

export const getQuestions = () => {
  return dispatch => {
    axios.get(`${apiUrl}/questions`)
    .then(response => {
      dispatch({
        type: FETCH_QUESTIONS,
        payload: response.data,
      });
    });
  };
};

export function postResponse({ hug, compliment, kiss }) {
  return (dispatch) => {
    // data: JSON.stringify(data)
    axios.post(`${apiUrl}/questions/`, { hug, compliment, kiss })
      .then(response => {
        dispatch({ type: MARK_ANSWERED });
        browserHistory.push('/dashboard');
      })
      .catch(response => {
        console.log(response);
      });
  };
}
