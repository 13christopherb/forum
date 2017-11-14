import {
    ADD_POST, GET_POSTS
} from "../actions/index";

const initialState = {
    posts: []
}

function posts(state=initialState, action) {
    const { id, timestamp, title,
        body, author, category, voteScore, deleted} = action;

    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                ['posts']: [posts].push(action.post)
            }
        case GET_POSTS:
            return {
                ...state,
                ['posts']: action.posts
            }
        default:
            return state
    }
}

export default posts