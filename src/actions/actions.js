export const ADD_POST = 'ADD_POST'
export const GET_POSTS = 'GET_POST'
export const DELETE_POST = 'DELETE_POST'

export function addPost ({ id, timestamp, title,
                             body, author, category }) {
    console.log(id);
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
        type: GET_POSTS,
        posts: posts
    }
}