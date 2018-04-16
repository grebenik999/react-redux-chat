import {SEND_MESSAGE, GET_MESSAGES} from '../../../constants/index';

export const messages = (state = [], action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return [...state, action.payload];
    case GET_MESSAGES:
      return [...state, action.payload];
    default:
      return state;
  }
};
