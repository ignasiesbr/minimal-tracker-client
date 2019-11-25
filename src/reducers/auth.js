import {
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    LOGIN_FAIL,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    ADD_NOTIFICATION_SUCCESS,
    ADD_NOTIFICATION_FAILURE
} from '../actions/constants';

const initialState = {
    user: null,
    loading: true,
    isAuthenticated: false,
    token: localStorage.getItem('token')
};

export default (state = initialState, action) => {
    switch(action.type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: action.payload
            }
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                ...action.payload,
                loading: false,
                isAuthenticated: true
            };
        case ADD_NOTIFICATION_SUCCESS:
            return {
                ...state,
                user: {
                    ...state.user,
                    notifications: [...state.user.notifications, action.payload]
                }
            }
        case ADD_NOTIFICATION_FAILURE:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                loading:false,
                isAuthenticated: false,
                token: null
            };
        default: 
            return state;
    }
}