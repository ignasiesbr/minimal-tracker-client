import { combineReducers } from 'redux';
import auth from './auth';
import projects from './projects';
import profile from './profile';
import alert from './alert';
import todos from './todos';

export default combineReducers({
    auth,
    projects,
    profile,
    alert,
    todos,
});
