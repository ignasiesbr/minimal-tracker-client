import {LOAD_PROJECTS, ADD_ISSUE, ADD_ISSUE_FAILURE} from '../actions/constants';

const initialState = {
    projects: [],
    selectedProject: null
}

export default (state = initialState, action ) => {
    const {type, payload} = action
    switch(type) {
        case LOAD_PROJECTS:
            return {
                ...state,
                projects: payload,
                selectedProject: payload[0],
            };
        case ADD_ISSUE:
            return {
                ...state,
                projects: state.projects.map(project => {
                    if (project._id == payload._id) {
                        return payload
                    }
                    return project;
                })
            };
        case ADD_ISSUE_FAILURE: 
        default:
            return state;
    }
}