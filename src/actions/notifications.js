import {ADD_NOTIFICATION_SUCCESS, ADD_NOTIFICATION_FAILURE, DELETE_NOTIFICATION_SUCCESS, 
        DELETE_NOTIFICATION_FAILURE,MARK_AS_READ_FAILURE, MARK_AS_READ_SUCCESS} from './constants';
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
        await axios.post(`/api/users/notifications/${user_id}`, json, config);
        // if (res.data) {
        //     dispatch(setAlert("Petition successfully sended", "success"));
        // };

    } catch (err) {
        dispatch(setAlert("Petition fail", "danger"));
    };
};

export const deleteNotification = id => async dispatch => {
    try {
        await axios.delete(`/api/users/notifications/${id}`);
        dispatch({
            type: DELETE_NOTIFICATION_SUCCESS,
            payload: id
        })
    } catch (error) {
        dispatch({
            type: DELETE_NOTIFICATION_FAILURE
        })
    }
};

export const markAsRead = id => async dispatch => {
    try {
        await axios.patch(`/api/users/notifications/${id}`);
        dispatch({
            type: MARK_AS_READ_SUCCESS,
            payload: id
        })
    } catch (error) {
        dispatch({
                type: MARK_AS_READ_FAILURE
        })
    }
}