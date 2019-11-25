import {ADD_NOTIFICATION_SUCCESS, ADD_NOTIFICATION_FAILURE} from './constants';
import axios from 'axios';
import {setAlert} from './alert';

export const addNotification = (json) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        };
       const res = await axios.post('/api/users/notifications', json, config);
       dispatch({
           type: ADD_NOTIFICATION_SUCCESS,
           payload: res.data
       });
    } catch (err) {
        dispatch({
            type: ADD_NOTIFICATION_FAILURE
        });
    };
};

export const addNotificationToUser = (user_id, json) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        };
        const res = await axios.post(`/api/users/notifications/${user_id}`, json, config);
        if (res.data) {
            dispatch(setAlert("Petition successfully sended", "success"));
        };

    } catch (err) {
        dispatch({
            type: ADD_NOTIFICATION_FAILURE
        });
    };
};