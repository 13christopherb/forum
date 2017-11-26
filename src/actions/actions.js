import * as ForumAPI from '../utils/ForumAPI.js';
import * as PostActions from './posts.js';
export const GOT_CATEGORIES = 'GOT_CATEGORIES'



export function gotCategories(categories) {
    return {
        type: GOT_CATEGORIES,
        categories: categories
    }
}

export const fetchCategories = () => dispatch => {
    ForumAPI.getCategories().then(data => {
        dispatch(gotCategories(data.categories));
    })
}