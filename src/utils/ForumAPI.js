const api = 'http://localhost:3001'

let token = 'whatever-you-want'

const headers = {
    'Accept': 'application/json',
    'Authorization': token,
    'Content-Type': 'application/json'
}

export const getCategories = () =>
    fetch(api + '/categories', { headers: headers }
    ).then(res => res.json())

export const getPost = (id) =>
    fetch(api + '/posts/' + id, { headers: headers }
    ).then(res => res.json())

export const getAllPosts = () =>
    fetch(api + '/posts', { headers: headers}
    ).then(res => res.json())

export const getFilteredPosts = (category) =>
    fetch(api + '/' + category + '/posts', { headers: headers}
    ).then(res => res.json())

export const addPost = (post) =>
    fetch(api + `/posts`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(post)
    }).then(res => res.json())

export const deletePost = (id) => {
    fetch(api + `/posts/` + id, {
        method: 'DELETE',
        headers: headers
    }).then(res => res.json())
}

/**
 * Updates an existing post
 * @param post The updated post
 */
export const editPost = (post) => {
    fetch(api + '/posts/' + post.id, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({
            title: post.title,
            body: post.body
        })
    }).then(res => res.json())
}

/**
 * Updates the vote count on the vote
 * @param post The post to be voted on
 * @param vote Either 'upVote' or 'downVote'
 */
export const voteOnPost = (post, vote) => {
    fetch(api + '/posts/' + post.id, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            option: vote
        })
    }).then(res => res.json())
}

export const getCommentsFromPost = (id) =>
    fetch(api + '/posts/' + id + '/comments', { headers: headers }
    ).then(res => res.json())

export const addComment = (comment) => {
    return fetch(api + `/comments`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(comment)
    })
}

export const deleteComment = (comment) => {
    fetch(api + `/comments/` + comment.id, {
        method: 'DELETE',
        headers: headers,
    }).then(res => res.json())
}

export const editComment = (comment) => {
    fetch(api + `/comments/` + comment.id, {
        method: 'PUT',
        headers: headers,
        body: JSON.stringify({
            timeStamp: Date.now(),
            body: comment.body
        })
    }).then(res => res.json())
}

/**
 * Updates the vote count on the comment
 * @param post The comment to be voted on
 * @param vote Either 'upVote' or 'downVote'
 */
export const voteOnComment = (comment, vote) => {
    fetch(api + '/comments/' + comment.id, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            option: vote
        })
    }).then(res => res.json())
}