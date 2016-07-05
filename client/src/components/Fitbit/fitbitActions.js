import { AUTH_FITBIT, FETCH_STATS } from '../../helpers/constants/types';
import axios from 'axios';
import { fitbitConfig } from '../../../../server/config';
const apiUrl = 'http://localhost:3000';
const fitbitURL = 'https://www.fitbit.com/oauth2/authorize?response_type=code&client_id';
const fitbitURL2 = 'scope=activity%20nutrition%20&expires_in=604800';
const clientID = fitbitConfig.clientID;
const callbackURI = fitbitConfig.URI;

// Get all events for each couple
// export const authFitbit = (coupleID) => {
//   return dispatch => {
//     axios.get(`${apiUrl}/events/${coupleID}`)
//     .then(response => {
//       dispatch({
//         type: FETCH_EVENTS,
//         payload: response.data,
//       });
//     })
//     .catch(err => {
//       console.log(err);
//     });
//   };
// };

export const authFitbit = () => {
  return dispatch => {
    window.location = `${fitbitURL}=${clientID}&redirect_uri=${callbackURI}&${fitbitURL2}`;
  };
};
