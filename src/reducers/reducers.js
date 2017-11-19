import { combineReducers } from 'redux';
import _ from 'underscore';
import {
    ADD_POST, DELETE_POST, GOT_POSTS, GOT_POST, EDIT_POST, ADD_COMMENT,
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
        case GOT_POST:
            let newState = {...state};
            newState['posts'] = _.reject(newState['posts'], (p) => {
                return action.post.id === p.id;
            });
            newState['posts'].push(action.post);
            return {
                ...state,
                state: newState
            }
        case EDIT_POST:
            var posts = [...state['posts']];
            for (var post in posts){
                if (post.id === action.post.id) {
                    post = action.post;
                }
            }
            return {
                ...state,
                ['posts']: posts
            }
        case DELETE_POST:
            return {
                ...state,
                ['posts']: _.reject(state['posts'], (p) => {
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
    comments
});