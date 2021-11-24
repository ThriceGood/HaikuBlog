import axios_csrf from './axiosCsrf'

const postUrl = 'http://localhost:3000/post'
const userUrl = 'http://localhost:3000/user'

export function getPost(id, setter) {
  axios_csrf().get(`${postUrl}/${id}`, {withCredentials: true})
    .then(response => {
      setter(response.data.post)
    })
    .catch(error => {console.log(error)})
}

export function getPosts(setter) {
  axios_csrf().get(postUrl, {withCredentials: true})
    .then(response => {
      setter(response.data.posts)
    })
    .catch(error => {console.log(error)})
}

export function getUserPosts(user_id, setter) {
  axios_csrf().get(`${userUrl}/${user_id}/post`, {withCredentials: true})
    .then(response => {
      setter(response.data.posts)
    })
    .catch(error => {console.log(error)})
}

export function createPost(post, navigate) {
  axios_csrf().post(postUrl, {post: post}, {withCredentials: true}) 
  .then(response => {
    if (response.data.status === 'created') {
      navigate(`/post/${response.data.post.id}`)
    }
  })
  .catch(error => {console.log(error)})
}

export function updatePost(post, navigate) {
  axios_csrf().put(`${postUrl}/${post.id}`, {post: post}, {withCredentials: true}) 
    .then(response => {
      if (response.data.status === 'ok') {
        navigate(`/post/${response.data.post.id}`)
      }
    })
    .catch(error => {console.log(error)})
}

export function deletePost(post, navigate) {
  axios_csrf().delete(`${postUrl}/${post.id}`, {withCredentials: true}) 
    .then(response => {
      if (response.data.status === 'ok') {
        navigate(`/`)
      }
    })
    .catch(error => {console.log(error)})
}