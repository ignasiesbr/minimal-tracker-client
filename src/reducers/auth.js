import {
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    LOGIN_FAIL,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    ADD_NOTIFICATION_SUCCESS,
    ADD_NOTIFICATION_FAILURE,
    DELETE_NOTIFICATION_SUCCESS,
    DELETE_NOTIFICATION_FAILURE,
    LOGOUT,
    MARK_AS_READ_FAILURE,
    MARK_AS_READ_SUCCESS
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
        case DELETE_NOTIFICATION_SUCCESS: 
            return {
                ...state,
                user: {
                    ...state.user,
                    notifications: state.user.notifications.filter(notification => notification._id !== action.payload)
                }
            }
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload
            }
        case MARK_AS_READ_SUCCESS:
            return {
                ...state,
                loading: false,
                user: {
                    ...state.user,
                    notifications: state.user.notifications.map(notification => {
                        if (notification._id === action.payload) {
                            return {
                                ...notification,
                                readed: !notification.readed
                            }
                        }
                        return notification;
                    })
                }
            }
        case UPDATE_USER_FAILURE:
        case DELETE_NOTIFICATION_FAILURE:
        case ADD_NOTIFICATION_FAILURE:
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            return {
                ...state,
                loading:false,
                isAuthenticated: false,
                token: null
            };
        case MARK_AS_READ_FAILURE:
        default: 
            return state;
    }
}