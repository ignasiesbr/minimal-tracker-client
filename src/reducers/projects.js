import {LOAD_PROJECTS, ADD_ISSUE, ADD_ISSUE_FAILURE, CHANGE_SELECTED, CHANGE_SELECTED_FAILURE} from '../actions/constants';

const initialState = {
    projects: [],
    selectedProject: null,
    loading: true
}

export default (state = initialState, action ) => {
    const {type, payload} = action
    switch(type) {
        case LOAD_PROJECTS:
            return {
                ...state,
                projects: payload,
                selectedProject: payload[0],
                loading: false,
            };
        case ADD_ISSUE:
            return {
                ...state,
                loading: false,
                projects: state.projects.map(project => project._id === state.selectedProject._id ? {
                    ...project,
                    issues: [...project.issues, payload]
                } : project)
            }; 
        case CHANGE_SELECTED:
            return {
                ...state,
                selectedProject: state.projects.filter(project => project._id === payload)[0],
                loading: false
            }
        case CHANGE_SELECTED_FAILURE:
        case ADD_ISSUE_FAILURE: 
        default:
            return state;
    }
}