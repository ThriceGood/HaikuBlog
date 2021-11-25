import { graphQuery, graphMutation } from './axiosCsrf'

export function getComments(post_id, setter, setErrors) {
  const queryString = `
    {
      comments(postId:${post_id}) {
        id
        text
        postId
        createdAt
        reactionInfo
        user {
          id
          username
        }
      }
    }
  `
  const setComments = response => {
    if (response.errors) {
      setErrors(response.errors)
    } else {
      setter(response.data.comments)
    }
  }
  graphQuery(queryString, setComments)
}

export function createComment(comment, setErrors) {
  const mutationString = `
    mutation {
      createComment(input:{
        text: "${comment.text}"
        postId: ${comment.post_id}
        userId: ${comment.user_id}
      }) {
        errors
      }
    }
  `
  const setComments = response => {
    if (response.data.createComment.errors) {
      setErrors(response.data.createComment.errors)
    } else {
      setter(response.data.createComment.comments)
    }
  }
  graphMutation(mutationString, setComments)
}

export function updateComment(comment, formSwitcher, setErrors) {
  const mutationString = `
    mutation {
      updateComment(input:{
        id: ${comment.id}
        text: "${comment.text}"
      }) {
        errors
      }
    }
  `
  const switchForm = response => {
    if (response.data.updateComment.errors) {
      setErrors(response.data.updateComment.errors)
    }
    formSwitcher()
  }
  graphMutation(mutationString, switchForm)
}

export function deleteComment(comment, setErrors) {
  const mutationString = `
    mutation {
      deleteComment(input: {
        id: ${comment.id}
      }) {
        message
      }
    }
  `
  const callback = response => {
    if (response.errors) {
      setErrors(response.errors)
    }
  }
  graphMutation(mutationString, callback)
}