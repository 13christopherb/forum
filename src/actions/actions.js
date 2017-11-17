export const ADD_POST = 'ADD_POST'
export const GOT_POSTS = 'GET_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const ADD_COMMENT = 'ADD_COMMENT'
export const GOT_COMMENTS = 'GOT_COMMENTS'

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