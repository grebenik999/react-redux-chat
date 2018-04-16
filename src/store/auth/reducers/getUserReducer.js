import { USER_LIST } from '../../../constants/index';


export const getUserList = (state = [], action) => {
    switch (action.type) {
        case USER_LIST:
            return Object.assign([],state, action.payload);
        default:
            return state;
    }
};
