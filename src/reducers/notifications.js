import {ADD_NOTIFICATION_SUCCESS, ADD_NOTIFICATION_FAILURE} from '../actions/constants';

//Lookup table for notifications by user_id
const initialState = {};

const addNoti = (lonot, not) => {
    if (!lonot) {
        return [not]
    }
    else {
        return [...lonot, not]
    }
}

export default (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case ADD_NOTIFICATION_SUCCESS:
            return {
                ...state,
                [payload.id]: addNoti(state[payload.id], payload.notification)
            }
        case ADD_NOTIFICATION_FAILURE:
            return state;
        default:
            return state;
    }
};