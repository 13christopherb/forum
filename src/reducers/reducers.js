import { combineReducers } from 'redux';
import _ from 'underscore';
import {
    ADD_POST, DELETE_POST, GOT_POSTS, GOT_POST, EDIT_POST, SORT_POSTS,
    ADD_COMMENT, GOT_COMMENTS, EDIT_COMMENT, SORT_COMMENTS, DELETE_COMMENT
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
            for (var i = 0; i < posts.length; i++) {
                if (posts[i].id === action.post.id) {
                    posts[i] = action.post;
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
        case SORT_POSTS:
            posts = [...state['posts']];
            posts.sort((a, b) => {
                switch (action.sortType) {
                    case 'voteScore':
                        return (a.voteScore > b.voteScore) ? -1 : 1;
                        return 0;
                }
            });
            return {
                ...state,
                posts: posts
            }
        default:
            return state
    }
}

function comments(state=initialState, action) {
    switch (action.type) {
        case ADD_COMMENT:
            var comments = [...state['comments']];
            comments.push(action.comment);
            return {
                ...state,
                ['comments']: comments
            }
        case GOT_COMMENTS:
            return {
                ...state,
                ['comments']: action.comments
            }
        case EDIT_COMMENT:
            var comments = [...state['comments']];

            for (var i = 0; i < comments.length; i++) {
                if (comments[i].id === action.comment.id) {
                    comments[i] = action.comment;
                }
            }
            return {
                ...state,
                ['comments']: comments
            }
        case DELETE_COMMENT:
            return {
                ...state,
                ['comments']: _.reject(state['comments'], (c) => {
                    return action.comment.id === c.id;
                })
            }
        case SORT_COMMENTS:
            comments = [...state['comments']];
            comments.sort((a, b) => {
               switch (action.sortType) {
                   case 'voteScore':
                       return (a.voteScore > b.voteScore) ? -1 : 1;
                       return 0;
               }
            });
            return {
                ...state,
                comments: comments
            }
        default:
            return state
    }
}

export default combineReducers({
    posts,
    comments
});