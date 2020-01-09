import {LOAD_TODOS_SUCCESS, LOAD_TODOS_FAILURE, ADD_TODO_SUCCESS, ADD_TODO_FAILURE ,REMOVE_TODO_SUCCESS, REMOVE_TODO_FAILURE,
    UPDATE_TODO_SUCCESS, UPDATE_TODO_FAILURE, FILTER_TODOS, FILTER_TODOS_FAILURE} from './constants';
import axios from 'axios';

export const fetchTodos = () => async dispatch => {
    try {
        
        const res = await axios.get('/api/todos');
        dispatch({
            type:LOAD_TODOS_SUCCESS,
            payload: res.data
        });

    } catch (err) {
        dispatch({
            type: LOAD_TODOS_FAILURE
        });
    };
};

export const updateTodo = (id, status) => async dispatch => {
    const newStatus = status === "COMPLETED" ? "ACTIVE" : "COMPLETED";
    const body = JSON.stringify({status: newStatus});
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    };
    try {
        const res = await axios.patch(`/api/todos/${id}`, body, config );
        dispatch({
            type: UPDATE_TODO_SUCCESS,
            payload: res.data
        });
    }
    catch(err) {
        dispatch({
            type: UPDATE_TODO_FAILURE
        });
    };
};

export const getVisibleTodos = (filter) => async dispatch => {
    try {
        if (!filter) {
            filter = "ALL";
        }
        const res = await axios.get(`/api/todos/filter/${filter}`);
        dispatch({
            type: FILTER_TODOS,
            payload: {data: res.data, filter: filter}
        });
    }
    catch(err) {
        dispatch({
            type: FILTER_TODOS_FAILURE
        });
    }
};

export const addTodo = (formData) => async dispatch => {
    try {
        const body = JSON.stringify(formData);
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        };
        const res = await axios.post('/api/todos', body, config);
        dispatch({
            type: ADD_TODO_SUCCESS,
            payload: res.data
        });
    }
    catch(err) {
        dispatch({
            type:ADD_TODO_FAILURE
        });
    }
};

export const deleteTodo = id => async dispatch => {
    try {
        const res = await axios.delete(`api/todos/${id}`);
        if (res) {
            console.log(res)
        }
        dispatch({
            type:REMOVE_TODO_SUCCESS,
            payload:id
        });
    }
    catch(err) {
        dispatch({
            type:REMOVE_TODO_FAILURE
        });
    }
}