import { FETCH_HEALTH } from '../../helpers/constants/types';

export default (state = {}, action) => {
  switch (action.type) {
    case FETCH_HEALTH:
      return { ...state, health: action.payload };
  }
  return state;
}
