import axios from 'axios';
import {LOAD_PROJECTS, ADD_ISSUE, ADD_ISSUE_FAILURE} from './constants';
import {setAlert} from './alert';

export const loadProjects = () => async dispatch => {
    try {
        const res = await axios.get('/api/project');
        dispatch({
            type: LOAD_PROJECTS,
            payload: res.data
        })

    } catch (err) {
        console.log(err);
    }
}

export const addIssue = (type, summary, description, project_id) => dispatch => {
    const body = JSON.stringify({type, summary, description});
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    };
    axios.post(`/api/project/issue/${project_id}`, body, config).then(
        res => {
            dispatch({
                type: ADD_ISSUE,
                payload: res.data
            });
            dispatch(setAlert("Issue added!", "success"));

        },
        err => {
            dispatch({
                type: ADD_ISSUE_FAILURE
            });
            dispatch(setAlert("Something went wrong", "danger"));
        });
};