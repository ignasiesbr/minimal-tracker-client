import {LOAD_TODOS_SUCCESS, LOAD_TODOS_FAILURE, ADD_TODO_SUCCESS, ADD_TODO_FAILURE ,REMOVE_TODO_SUCCESS, REMOVE_TODO_FAILURE,
         UPDATE_TODO_SUCCESS, UPDATE_TODO_FAILURE, FILTER_TODOS, FILTER_TODOS_FAILURE} from '../actions/constants';

const initialState = {
    todos: [],
    loading: true,
    visibleTodos: []
}

export default (state = initialState, action) => {
    const {type, payload} = action;
    switch(type) {
        case LOAD_TODOS_SUCCESS:
            return {
                loading: false,
                todos: payload,
                visibleTodos: payload,
            };
        case LOAD_TODOS_FAILURE:
            return {
                ...state,
                loading: false
            }
        case UPDATE_TODO_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: state.todos.map(todo => {
                    if (todo._id === payload._id) {
                        return payload;
                    }
                    return todo;
                }),
                visibleTodos: state.visibleTodos.map(todo => {
                    if (todo._id === payload._id) {
                        return payload;
                    }
                    return todo;
                })
            };
        case FILTER_TODOS:
            return {
                ...state,
                visibleTodos: payload
            }

        case ADD_TODO_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: [...state.todos, payload],
            }

        case REMOVE_TODO_SUCCESS:
            return {
                ...state,
                loading: false,
                todos: state.todos.filter(todo => todo._id !== payload)
            };
        case REMOVE_TODO_FAILURE:
        case FILTER_TODOS_FAILURE:
        case UPDATE_TODO_FAILURE:
            return state;
        default:
            return state;
    };
};