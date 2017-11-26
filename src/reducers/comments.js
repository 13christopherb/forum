import _ from 'underscore';
import * as CommentActions from '../actions/comments.js';

const initialState = {
    comments: []
}

function comments(state=initialState, action) {
    switch (action.type) {
        case CommentActions.ADD_COMMENT:
            var comments = [...state['comments']];
            comments.push(action.comment);
            return {
                ...state,
                ['comments']: comments
            }
        case CommentActions.GOT_COMMENTS:
            return {
                ...state,
                ['comments']: action.comments
            }
        case CommentActions.EDIT_COMMENT:
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
        case CommentActions.DELETE_COMMENT:
            return {
                ...state,
                ['comments']: _.reject(state['comments'], (c) => {
                    return action.comment.id === c.id;
                })
            }
        case CommentActions.SORT_COMMENTS:
            comments = [...state['comments']];
            comments.sort((a, b) => {
                switch (action.sortType) {
                    case 'top':
                        return (a.voteScore > b.voteScore) ? -1 : 1;
                        return 0;
                    case 'bottom':
                        return (a.voteScore < b.voteScore) ? -1 : 1;
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

export default comments;