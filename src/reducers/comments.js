import _ from 'underscore';
import {
    ADD_COMMENT, GOT_COMMENTS, EDIT_COMMENT, SORT_COMMENTS, DELETE_COMMENT
} from "../actions/actions";

const initialState = {
    comments: []
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