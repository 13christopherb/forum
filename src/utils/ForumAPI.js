const api = 'http://localhost:3001'

let token = 'whatever-you-want'

const headers = {
    'Accept': 'application/json',
    'Authorization': token,
    'Content-Type': 'application/json'
}

export const getPost = (id) =>
    fetch(api + '/posts/' + id, { headers: headers }
    ).then(res => res.json())

export const getAllPosts = () =>
    fetch(api + '/posts', { headers: headers}
    ).then(res => res.json())

export const addPost = (post) =>
    fetch(api + `/posts`, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(post)
    })

export const deletePost = (id) => {
    console.log(id);
    fetch(api + `/posts/` + id, {
        method: 'DELETE',
        headers: headers
    })
}

