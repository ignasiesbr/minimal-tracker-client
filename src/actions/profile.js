import {UPDATE_PROFILE, UPDATE_PROFILE_FAILURE} from './constants';
import axios from 'axios';
import {setAlert} from './alert';

export const updateProfile = json => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    };
    try {
        const res = await axios.post('/api/profile', json, config);
        dispatch({
            type:UPDATE_PROFILE,
            payload: res.data
        });
        dispatch(setAlert("Profile updated successfully", "success"));

    }
    catch(err) {
        dispatch({
            type: UPDATE_PROFILE_FAILURE
        })
        dispatch(setAlert("Something went wrong", "danger"));

    }
};

export const loadProfile = () => async dispatch => {
    try {
        const res = await axios.get('/api/profile/me');
        dispatch({
            type: UPDATE_PROFILE,
            payload:res.data
        });
    } catch (err) {
        dispatch({
            type: UPDATE_PROFILE_FAILURE
        });
    }
}