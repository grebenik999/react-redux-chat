import {ADD_NEW_USER, LOGOUT} from '../../../constants/index';
export const addUsersToDB = (state = [], action) => {
  switch (action.type) {
    case ADD_NEW_USER:
      return action.payload;
    case LOGOUT:
      return action.payload;
    default:
      return state;
  }
};
