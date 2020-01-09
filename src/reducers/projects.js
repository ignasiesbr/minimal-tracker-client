import {LOAD_PROJECTS, ADD_ISSUE, ADD_ISSUE_FAILURE, CHANGE_SELECTED, CHANGE_SELECTED_FAILURE,
        ADD_USER_PROJECT_SUCCESS, ADD_USER_PROJECT_FAILURE, CREATE_PROJECT_SUCCESS, CREATE_PROJECT_FAILURE, 
        POST_ISSUE_MESSAGE_SUCCESS, POST_ISSUE_MESSAGE_FAILURE, 
        UPDATE_ISSUE, REMOVE_PROJECT, REMOVE_PROJECT_FAILURE, REMOVE_ISSUE, REMOVE_ISSUE_FAILURE} from '../actions/constants';

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
                selectedProject: !state.selectedProject ? payload[0] : payload.find(project => project._id === state.selectedProject._id),
                loading: false,
            };
        case CREATE_PROJECT_SUCCESS:
            return {
                ...state,
                loading: false,
                projects: [...state.projects, payload],
                selectedProject:payload
            };
        case ADD_ISSUE:
            return {
                ...state,
                loading: false,
                projects: state.projects.map(project => {
                    if (project._id === payload._id) {
                        return {
                            payload
                        }
                    }
                    else {
                        return project
                    }
                }),
                selectedProject: state.selectedProject._id === payload._id ? payload : state.selectedProject
            }; 
        case CHANGE_SELECTED:
            return {
                ...state,
                selectedProject: state.projects.filter(project => project._id === payload)[0],
                loading: false
            }
        case ADD_USER_PROJECT_SUCCESS:
            return {
                ...state,
                projects: [...state.projects, payload],
                loading: false
            }
        case POST_ISSUE_MESSAGE_SUCCESS: 
            //payload is an issue object
            return {
                ...state,
                loading: false,
                projects: state.projects.map(project => {
                    if (project._id === state.selectedProject._id) {
                        return {
                            ...project,
                            issues: project.issues.map(issue => {
                                if (issue._id === payload._id) {
                                    return payload
                                }
                                return issue;
                            })
                        }
                    }
                    else {
                        return project;
                    }
                }),
                selectedProject: {
                    ...state.selectedProject,
                    issues: state.selectedProject.issues.map(issue => {
                        if (issue._id === payload._id) {
                            return payload;
                        }
                        else {
                            return issue;
                        }
                    })
                }
            };
        case UPDATE_ISSUE:
            return {
                ...state,
                loading:false,
                projects: state.projects.map(project => project._id === payload._id ? payload : project),
                selectedProject: payload
            }

        case REMOVE_ISSUE:
            return {
                ...state,
                loading:false,
                projects: state.projects.map(project => {
                    if (project._id === payload.project_id) {
                        project.issues = project.issues.filter(issue => issue._id !== payload.issue_id);
                        return project
                    }
                    else {
                        return project
                    }
                }),
                selectedProject: {...state.selectedProject, issues: state.selectedProject.issues.filter(issue => issue._id !== payload.issue_id)}
            }
        case REMOVE_PROJECT:
            return {
                ...state,
                loading: false,
                projects: state.projects.filter(project => project._id !== payload),
                selectedProject: state.selectedProject._id === payload ? state.projects[0] : state.selectedProject
            }
        case REMOVE_ISSUE_FAILURE:
        case REMOVE_PROJECT_FAILURE:
        case POST_ISSUE_MESSAGE_FAILURE:
        case CREATE_PROJECT_FAILURE:
        case ADD_USER_PROJECT_FAILURE:
        case CHANGE_SELECTED_FAILURE:
        case ADD_ISSUE_FAILURE: 
        default:
            return state;
    }
}