import { combineReducers } from 'redux';
import _ from 'underscore';
import {
    ADD_POST, DELETE_POST, GOT_POSTS, EDIT_POST, ADD_COMMENT,
    GOT_COMMENTS
} from "../actions/actions";

const initialState = {
    posts: [],
    comments: []
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
        case EDIT_POST:
            let newState = {...state};
            newState['posts'] = _.reject(newState['posts'], (p) => {
                return action.post.id === p.id;
            });
            newState['posts'].push(action.post);
            return {
                state: newState
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

function comments(state=initialState, action) {
    switch (action.type) {
        case ADD_COMMENT:
            return {
                ...state,
                ['comments']: ['comments'].push(action.comment)
            }
        case GOT_COMMENTS:
            return {
                ...state,
                ['comments']: action.comments
            }
        default:
            return state
    }
}

export default combineReducers({
    posts,
});