import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import {loadState, saveState} from './utils/localStorage';

const initialState = loadState();

const middlewares = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
    // applyMiddleware(...middlewares)
);

store.subscribe(() => {
    saveState(store.getState());
});

export default store;