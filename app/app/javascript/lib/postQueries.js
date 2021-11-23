import axios from 'axios'

const postUrl = 'http://localhost:3000/post'

export function getPost(id, setter) {
  axios.get(`${postUrl}/${id}`, {withCredentials: true})
    .then(response => {
      setter(response.data.post)
    })
    .catch(error => {console.log(error)})
}

export function getPosts(setter) {
  axios.get(postUrl, {withCredentials: true})
    .then(response => {
      setter(response.data.posts)
    })
    .catch(error => {console.log(error)})
}

export function createPost(post, navigate) {
  axios.post(postUrl, {post: post}, {withCredentials: true}) 
  .then(response => {
    if (response.data.status === 'created') {
      navigate(`/post/${response.data.post.id}`)
    }
  })
  .catch(error => {console.log(error)})
}

export function updatePost(post, navigate) {
  axios.put(`${postUrl}/${post.id}`, {post: post}, {withCredentials: true}) 
    .then(response => {
      if (response.data.status === 'ok') {
        navigate(`/post/${response.data.post.id}`)
      }
    })
    .catch(error => {console.log(error)})
}

export function deletePost(post, navigate) {
  axios.delete(`${postUrl}/${post.id}`, {withCredentials: true}) 
    .then(response => {
      if (response.data.status === 'ok') {
        navigate(`/`)
      }
    })
    .catch(error => {console.log(error)})
}