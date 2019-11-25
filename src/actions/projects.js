import axios from 'axios';
import {LOAD_PROJECTS, ADD_ISSUE, ADD_ISSUE_FAILURE, CHANGE_SELECTED, CHANGE_SELECTED_FAILURE} from './constants';
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

export const addIssue = (issueData) => dispatch => {
    const body = JSON.stringify(issueData);
    const config = {
        headers: {
            'Content-Type':'application/json'
        }
    };
    axios.post(`/api/project/issue/${issueData.project_id}`, body, config).then(
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

export const changeSelectedProject = (id) => dispatch => {
    try {
        dispatch({
            type: CHANGE_SELECTED,
            payload:id
        });
    }
    catch(err) {
        dispatch({
            type: CHANGE_SELECTED_FAILURE
        });
    };
};

export const inviteUser = id => dispatch => {
    return null;
}