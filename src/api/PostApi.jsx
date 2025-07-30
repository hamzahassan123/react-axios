import axios from "axios";

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
})

//function to get data from api
export const getPosts = () => {
    return api.get('/posts')
}

// function to get delete single post
export const deletePost = (id) => {
    return api.delete(`/posts/${id}`)
}

//function to create a new post
export const createPost = (data) => {
    return api.post('/posts', data)
}

//function to update a post
export const updatePost = (id, data) => {
    return api.put(`/posts/${id}`, data)
}



