import * as ForumAPI from '../utils/ForumAPI.js';

export const ADD_COMMENT = 'ADD_COMMENT'
export const GOT_COMMENTS = 'GOT_COMMENTS'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const SORT_COMMENTS = 'SORT_COMMENTS'

export function addComment(comment) {
    return {
        type: ADD_COMMENT,
        comment: comment
    }
}


export const postComment = (comment) => dispatch => {
    ForumAPI.addComment(comment).then(res => {
        dispatch(addComment(comment));
        dispatch(sortComments('top'));
    });
}

export function gotComments(comments) {
    return {
        type: GOT_COMMENTS,
        comments: comments
    }
}

export const fetchCommentsFromPost = (postId) => dispatch => {
    ForumAPI.getCommentsFromPost(postId).then(data => {
        dispatch(gotComments(data));
        dispatch(sortComments('top'));
    });
}


export function editComment(comment) {
    return {
        type: EDIT_COMMENT,
        comment: comment
    }
}

export const updateComment = (comment) => dispatch => {
    ForumAPI.editComment(comment)
    dispatch(editComment(comment));
}

export function removeComment(comment) {
    return {
        type: DELETE_COMMENT,
        comment: comment
    }
}

export const deleteComment = (comment) => dispatch => {
    ForumAPI.deleteComment(comment)
    dispatch(removeComment(comment));
}

/**
 * Dispatched when a comment is voted on
 * @param post The comment to be voted on
 * @param delVoteScore The change in the voteScore as a result of the vote
 * @param voteResult The direction of the vote, upVote for positive, downVote for negative
 */
export const commentVote = (comment, delVoteScore, voteResult) => dispatch => {
    for (let i = 0; i < Math.abs(delVoteScore); i++) {
        ForumAPI.voteOnComment(comment, voteResult);
    }
    dispatch(editComment(comment));
    dispatch(sortComments('top'));
}

export function sortComments(sortType) {
    return {
        type: SORT_COMMENTS,
        sortType: sortType
    }
}