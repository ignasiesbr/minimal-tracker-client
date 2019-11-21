import  {UPDATE_PROFILE, UPDATE_PROFILE_FAILURE} from '../actions/constants';

const initialState = {
    profile: {},
}

export default (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case UPDATE_PROFILE:
            return {
                ...state, 
                profile: payload
            }
        case UPDATE_PROFILE_FAILURE:
            
        default:
            return state;
    }
}
