import * as ForumAPI from '../utils/ForumAPI.js';
import * as CommentActions from './comments.js';

export const ADD_POST = 'ADD_POST'
export const GOT_POSTS = 'GOT_POST'
export const GOT_POST = 'GOT_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const SORT_POSTS = 'SORT_POSTS'

export function addPost({
                            id, timestamp, title,
                            body, author, category
                        }) {
    return {
        type: ADD_POST,
        post: {
            id,
            timestamp,
            title,
            body,
            author,
            category,
            voteScore: 1,
            deleted: false
        }
    }
}

export const postPost = ({
                             id, timestamp, title,
                             body, author, category
                         }) => dispatch => {
    const post = {
        id,
        timestamp,
        title,
        body,
        author,
        category,
        voteScore: 1,
        deleted: false
    }
    ForumAPI.addPost(post).then(() => {
        dispatch(addPost(post));
    });

}

export function gotPosts(posts) {
    return {
        type: GOT_POSTS,
        posts: posts
    }
}

export const fetchPosts = (category) => dispatch => {
    if (category) {
        ForumAPI.getFilteredPosts(category).then((posts) => {
            dispatch(gotPosts(posts));
            dispatch(sortPosts('top'));
        });
    } else {
        ForumAPI.getAllPosts().then((posts) => {
            dispatch(gotPosts(posts));
            dispatch(sortPosts('top'));
        });
    }
}

/**
 * Fetches the post and all the comments that belong to it
 * @param id The id of the post
 */
export const fetchPost = (id) => dispatch => {
    ForumAPI.getPost(id).then(post => {
            let posts = [];
            posts.push(post);
            dispatch(gotPosts(posts));
            ForumAPI.getCommentsFromPost(post.id).then(comment => {
                dispatch(CommentActions.gotComments(comment));
                dispatch(CommentActions.sortComments('top'));
            });
        }
    );
}

export function editPost(post) {
    return {
        type: EDIT_POST,
        post: post
    }
}

export const updatePost = (post) => dispatch => {
    ForumAPI.editPost(post)
    dispatch(editPost(post));
}

export function removePost(post) {
    return {
        type: DELETE_POST,
        post: post
    }
}

export const deletePost = (post) => dispatch => {
    ForumAPI.deletePost(post.id);
    dispatch(removePost(post));
}

/**
 * Dispatched when a post is voted on
 * @param post The post to be voted on
 * @param delVoteScore The change in the voteScore as a result of the vote
 * @param voteResult The direction of the vote, upVote for positive, downVote for negative
 */
export const postVote = (post, delVoteScore, voteResult) => dispatch => {
    for (let i = 0; i < Math.abs(delVoteScore); i++) {
        ForumAPI.voteOnPost(post, voteResult);
    }
    dispatch(editPost(post));
    dispatch(sortPosts('top'));
}


export function sortPosts(sortType) {
    return {
        type: SORT_POSTS,
        sortType: sortType
    }
}