import { baseUrl, httpClient, graphQuery, graphMutation } from './axiosCsrf'

const commentUrl = `${baseUrl}/comment`

export function getComments(post_id, setter) {
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
    setter(response.data.data.comments)
  }
  graphQuery(queryString, setComments)
}

export function createComment(comment) {
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
    // response.data.data.createComment.errors
  }
  graphMutation(mutationString, setComments)
}

export function updateComment(comment, formSwitcher) {

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
    formSwitcher()
  }
  graphMutation(mutationString, switchForm)
}

export function deleteComment(comment) {

  const mutationString = `
    mutation {
      deleteComment(input: {
        id: ${comment.id}
      }) {
        message
      }
    }
  `
  const callbackf = response => {
    // response.data.data.deleteComment.message: "successfully deleted comment"
  }
  graphMutation(mutationString, callbackf)
}