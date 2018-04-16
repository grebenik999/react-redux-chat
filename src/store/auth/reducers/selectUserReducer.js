import {SELECT_USER} from '../../../constants/index';

export const chatWithSelectedUser = (state = {}, action) => {
    switch (action.type) {
        case SELECT_USER:
            return Object.assign({},state, action.payload);
        default:
            return state;
    }
};