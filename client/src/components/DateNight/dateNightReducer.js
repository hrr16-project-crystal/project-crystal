import { YELP_REQUEST } from '../../helpers/constants/types';

export default (state = {}, action) => {
  switch (action.type) {
    case YELP_REQUEST:
      return { ...state, restaurants: action.payload };
  }
  return state;
}