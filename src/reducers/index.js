import { combineReducers } from 'redux';
import auth from './auth';
import projects from './projects';
import profile from './profile';
import alert from './alert';

export default combineReducers({
    auth,
    projects,
    profile,
    alert
});
