import axios from "axios";

const commentUrl = 'http://localhost:3000/comment'
const postUrl = 'http://localhost:3000/post'

export function getComments(post_id, setter) {
  axios.get(`${postUrl}/${post_id}/comment`, {withCredentials: true})
    .then(response => {
      if (response.data.status === 'ok') {
        setter(response.data.comments)
      }
    })
    .catch(error => {console.log(error)})
}

export function createComment(comment, setter) {
  axios.post(commentUrl, {comment: comment}, {withCredentials: true})
    .then(response => {
      if (response.data.status === 'created') {
      
      }
    })
    .catch(error => {console.log(error)})
}

export function updateComment(comment, switcher) {
  axios.put(`${commentUrl}/${comment.id}`, {comment: comment}, {withCredentials: true})
    .then(response => {
      if (response.data.status === 'ok') {
        switcher()
      }
    })
    .catch(error => {console.log(error)})
}

export function deleteComment(comment, setter) {
  axios.delete(`${commentUrl}/${comment.id}`, {withCredentials: true})
    .then(response => {
      if (response.data.status === 'ok') {
        // setter(null)
      }
    })
    .catch(error => {console.log(error)})
}