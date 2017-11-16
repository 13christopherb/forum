import { combineReducers } from 'redux';
import _ from 'underscore';
import {
    ADD_POST, DELETE_POST, GOT_POSTS
} from "../actions/actions";

const initialState = {
    posts: []
}


function posts(state=initialState, action) {
    const { id, timestamp, title,
        body, author, category, voteScore, deleted} = action;

    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                ['posts']: ['posts'].push(action.post)
            }
        case GOT_POSTS:
            return {
                ...state,
                ['posts']: action.posts
            }
        case DELETE_POST:
            return {
                ...state,
                ['posts']: _.reject(['posts'], (p) => {
                    return action.post.id === p.id;
                })
            }
        default:
            return state
    }
}

export default combineReducers({
    posts,
});