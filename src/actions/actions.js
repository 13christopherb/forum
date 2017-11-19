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

export function addPost ({ id, timestamp, title,
                             body, author, category }) {
    return {
        type: ADD_POST,
        post: {id,
            timestamp,
            title,
            body,
            author,
            category,
            voteScore: 1,
            deleted: false}
    }
}

export function gotPosts (posts) {
    return {
        type: GOT_POSTS,
        posts: posts
    }
}

export function gotPost (post) {
    return {
        type: GOT_POST,
        post: post
    }
}

export function editPost (post) {
    return {
        type: EDIT_POST,
        post: post
    }
}

export function deletePost (post) {
    return {
        type: DELETE_POST,
        post: post
    }
}

export function sortPosts (sortType) {
    return {
        type: SORT_POSTS,
        sortType: sortType
    }
}

export function addComment (comment) {
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

export function editComment (comment) {
    return {
        type: EDIT_COMMENT,
        comment: comment
    }
}

export function deleteComment (comment) {
    return {
        type: DELETE_COMMENT,
        comment: comment
    }
}

export function sortComments (sortType) {
    return {
        type: SORT_COMMENTS,
        sortType: sortType
    }
}