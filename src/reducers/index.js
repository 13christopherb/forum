import {
    ADD_POST
} from "../actions/index";

function post(state={}, action) {
    const { id, timestamp, title,
        body, author, category, voteScore, deleted} = action;

    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                [posts]: [posts].push(action.post)
            }
        default:
            return state
    }
}