import _ from 'underscore';
import * as PostActions from "../actions/posts.js";

const initialState = {
    posts: []
}

function posts(state=initialState, action) {
    switch (action.type) {
        case PostActions.ADD_POST:
            var posts = [...state['posts']];
            posts.push(action.post);
            return {
                ...state,
                ['posts']: posts
            }
        case PostActions.GOT_POSTS:
            return {
                ...state,
                ['posts']: action.posts
            }
        case PostActions.GOT_POST:
            let newState = {...state};
            newState['posts'] = _.reject(newState['posts'], (p) => {
                return action.post.id === p.id;
            });
            newState['posts'].push(action.post);
            return {
                state: newState
            }
        case PostActions.EDIT_POST:
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
        case PostActions.DELETE_POST:
            return {
                ...state,
                ['posts']: _.reject(state['posts'], (p) => {
                    return action.post.id === p.id;
                })
            }
        case PostActions.SORT_POSTS:
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