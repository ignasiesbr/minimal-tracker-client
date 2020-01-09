import axios from 'axios';
import {LOAD_PROJECTS, ADD_ISSUE, ADD_ISSUE_FAILURE, CHANGE_SELECTED, 
        CHANGE_SELECTED_FAILURE, ADD_USER_PROJECT_SUCCESS, 
        ADD_USER_PROJECT_FAILURE, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAILURE,
        POST_ISSUE_MESSAGE_SUCCESS, POST_ISSUE_MESSAGE_FAILURE,
        UPDATE_ISSUE, UPDATE_ISSUE_FAILURE,
        REMOVE_PROJECT, REMOVE_PROJECT_FAILURE, REMOVE_ISSUE, REMOVE_ISSUE_FAILURE
    } from './constants';
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

export const addUserToProject = id => async (dispatch) => {
    try {
        const res = await axios.post(`/api/project/${id}`);
        dispatch({
            type: ADD_USER_PROJECT_SUCCESS,
            payload: res.data
        });
    } 
    catch (err) {
        console.error("some error in actions/project/adduser");
        dispatch({
            type: ADD_USER_PROJECT_FAILURE
        })
    };
};

export const createProject = json => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        };        
        const res = await axios.post('/api/project', json, config);
        dispatch({
            type: CREATE_PROJECT_SUCCESS,
            payload: res.data
        });
        dispatch(setAlert("Project added", "success"));
    } catch (err) {
        dispatch({
            type: CREATE_PROJECT_FAILURE
        });
        dispatch(setAlert("Something went wrong", "danger"));
    };
};

export const postMessageIssue = (json, id_project,id_issue) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type':'application/json'
            }
        };
        const res = await axios.post(`/api/project/${id_project}/${id_issue}`, json, config);
        dispatch({
            type: POST_ISSUE_MESSAGE_SUCCESS,
            payload: res.data
        });
    }
    catch(err) {
        dispatch({
            type: POST_ISSUE_MESSAGE_FAILURE
        });
    }
}

export const updateIssue = (project_id, issue_id) => async dispatch => {
    try {
        const res = await axios.patch(`/api/project/issue/${project_id}/${issue_id}`);
        dispatch({
            type: UPDATE_ISSUE,
            payload: res.data
        });
    }
    catch(err) {
        dispatch({
            type: UPDATE_ISSUE_FAILURE
        });
    };
};

export const removeIssue = (project_id, issue_id) => async dispatch => {
    try {
        await axios.delete(`/api/project/issue/${project_id}/${issue_id}`);
        dispatch({
            type: REMOVE_ISSUE,
            payload: {project_id, issue_id}
        })
    } catch (error) {
        dispatch({
            type: REMOVE_ISSUE_FAILURE
        })
    }
}

export const removeProject = (project_id) => async dispatch => {
    try {
        await axios.delete(`/api/project/${project_id}`);
        dispatch({
            type: REMOVE_PROJECT,
            payload: project_id
        })
    }
    catch(err) {
        dispatch({
            type: REMOVE_PROJECT_FAILURE
        })
    }
 }