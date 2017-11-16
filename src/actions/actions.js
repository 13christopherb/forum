export const ADD_POST = 'ADD_POST'
export const GOT_POSTS = 'GET_POST'
export const DELETE_POST = 'DELETE_POST'

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

export function deletePost (post) {
    return {
        type: DELETE_POST,
        post: post
    }
}