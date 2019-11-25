import axios from 'axios';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED,
    AUTH_ERROR

} from './constants';
import setAuthToken from '../utils/setAuthToken';
import {setAlert} from './alert';


export const loadUser =  () => async dispatch => {
    if (localStorage.getItem('token')) {
        setAuthToken(localStorage.getItem('token'));
    };

    try {
        const res = await axios.get('/api/auth');
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });

    }
    catch(err) {
        dispatch({
            type: AUTH_ERROR
        });
    };
};

export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    };

    const body = JSON.stringify({email, password});
    try {
        const res = await axios.post('/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

        dispatch(setAlert("Logged in successfully", "success"));
    }
    catch(err) {
        console.error(err);
        dispatch({
            type: LOGIN_FAIL
        });
        dispatch(setAlert("Something went wrong", "danger"));
    }
}

export const register = (name, email, password, password2)  => async dispatch =>{
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    };
    console.log('gets to action');
    const body = JSON.stringify({name, email, password, password2});
    try {
        const res = await axios.post('/api/users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

        dispatch(setAlert("Registered successfully", "success"));
    }
    catch(err) {
        dispatch({
            type: REGISTER_FAIL
        });
        dispatch(setAlert("Something went wrong", "danger"));

    }
};
