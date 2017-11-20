import { combineReducers } from 'redux';
import posts from './posts.js';
import comments from './comments.js';
import {
    GOT_CATEGORIES
} from "../actions/actions";

const initialState = {
    categories: [],
}

function categories(state=initialState, action) {
    switch (action.type) {
        case GOT_CATEGORIES:
            return {
                ...state,
                ['categories']: action.categories
            }
        default:
            return state
    }
}

export default combineReducers({
    categories,
    posts,
    comments
});