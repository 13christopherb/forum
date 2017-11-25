import * as ForumAPI from '../utils/ForumAPI.js';

export const GOT_CATEGORIES = 'GOT_CATEGORIES'
export const ADD_POST = 'ADD_POST'
export const GOT_POSTS = 'GOT_POST'
export const GOT_POST = 'GOT_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const SORT_POSTS = 'SORT_POSTS'
export const ADD_COMMENT = 'ADD_COMMENT'
export const GOT_COMMENTS = 'GOT_COMMENTS'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const SORT_COMMENTS = 'SORT_COMMENTS'

export function gotCategories(categories) {
    return {
        type: GOT_CATEGORIES,
        categories: categories
    }
}

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

export const fetchPost = (id) => dispatch => {
    ForumAPI.getPost(id).then(data => {
            let posts = [];
            posts.push(data);
            dispatch(gotPosts(posts));
        }
    );
}

export function editPost(post) {
    return {
        type: EDIT_POST,
        post: post
    }
}

export function deletePost(post) {
    return {
        type: DELETE_POST,
        post: post
    }
}

export function sortPosts(sortType) {
    return {
        type: SORT_POSTS,
        sortType: sortType
    }
}

export function addComment(comment) {
    return {
        type: ADD_COMMENT,
        comment: comment
    }
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

export function deleteComment(comment) {
    return {
        type: DELETE_COMMENT,
        comment: comment
    }
}

export function sortComments(sortType) {
    return {
        type: SORT_COMMENTS,
        sortType: sortType
    }
}