import _ from 'underscore';
import {
    ADD_POST, DELETE_POST, GOT_POSTS, GOT_POST, EDIT_POST, SORT_POSTS
} from "../actions/actions";

const initialState = {
    posts: []
}

function posts(state=initialState, action) {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                ['posts']: ['posts'].push(action.post)
            }
        case GOT_POSTS:
            return {
                ...state,
                ['posts']: action.posts
            }
        case GOT_POST:
            let newState = {...state};
            newState['posts'] = _.reject(newState['posts'], (p) => {
                return action.post.id === p.id;
            });
            newState['posts'].push(action.post);
            return {
                state: newState
            }
        case EDIT_POST:
            var posts = [...state['posts']];
            for (var i = 0; i < posts.length; i++) {
                if (posts[i].id === action.post.id) {
                    posts[i] = action.post;
                }
            }
            return {
                ...state,
                ['posts']: posts
            }
        case DELETE_POST:
            return {
                ...state,
                ['posts']: _.reject(state['posts'], (p) => {
                    return action.post.id === p.id;
                })
            }
        case SORT_POSTS:
            posts = [...state['posts']];
            posts.sort((a, b) => {
                switch (action.sortType) {
                    case 'top':
                        return (a.voteScore > b.voteScore) ? -1 : 1;
                        return 0;
                    case 'bottom':
                        return (a.voteScore < b.voteScore) ? -1 : 1;
                        return 0;
                    case 'newest':
                        return (a.timestamp > b.timestamp) ? -1 : 1;
                        return 0;
                    case 'oldest':
                        return (a.timestamp < b.timestamp) ? -1 : 1;
                        return 0;
                }
            });
            return {
                ...state,
                posts: posts
            }
        default:
            return state
    }
}

export default posts;