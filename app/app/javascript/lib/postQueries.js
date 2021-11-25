import { graphQuery, graphMutation } from './axiosCsrf'

/* 
* post query helpers for CRUDing posts
*/

export function getPost(post_id, setter, setErrors) {
  const queryString = `
  {
    post(id:${post_id}) {
      id
      title
      content
      createdAt
      commentCount
      user {
        id
        username
      }
    }
  }
  `
  const callback = response => {
    if (response.errors) {
      setErrors(response.errors)
    } else {
      setter(response.data.post)
    }
  }
  graphQuery(queryString, callback)
}

export function getPosts(setter) {
  const queryString = `
    {
      posts {
        id
        title
        content
        createdAt
        commentCount
        user {
          id
          username
        }
      }
    }
  `
  const callback = response => {
    if (response.errors) {
      setErrors(response.errors)
    } else {
      setter(response.data.posts)
    }
  }
  graphQuery(queryString, callback)
}

export function getUserPosts(user_id, setter, setErrors) {
  const queryString = `
    {
      user(id:${user_id}) {
        posts {
          id
          title
          content
          createdAt
          commentCount
          user {
            id
            username
          }
        }
      }
    }
  `
  const callback = response => {
    if (response.errors) {
      setErrors(response.errors)
    } else {
      setter(response.data.user.posts)
    }
  }
  graphQuery(queryString, callback)
}

export function createPost(post, navigate, setErrors) {
  const mutationString = `
    mutation {
      createPost(input:{
        title: "${post.title}"
        content: "${post.content}"
        userId: ${post.user_id}
      }) {
        post {
          id
        }
        errors
      }
    }
  `
  const callback = response => {
    if (response.data.createPost.errors) {
      setErrors(response.data.createPost.errors)
    } else {
      navigate(`/post/${response.data.createPost.post.id}`)
    }
  }
  graphMutation(mutationString, callback)
}

export function updatePost(post, navigate, setErrors) {
  const mutationString = `
    mutation {
      updatePost(input:{
        id: ${post.id}
        title: "${post.title}"
        content: "${post.content}"
      }) {
        post {
          id
        }
        errors
      }
    }
  `
  const callback = response => {
    console.log(response);
    if (response.data.updatePost.errors) {
      setErrors(response.data.updatePost.errors)
    } else {
      navigate(`/post/${response.data.updatePost.post.id}`)
    }
  }
  graphMutation(mutationString, callback)
}

export function deletePost(post, navigate, setErrors) {
  const mutationString = `
    mutation {
      deletePost(input: {
        id: ${post.id}
      }) {
        message
      }
    }
  `
  const callback = response => {
    if (response.data.deletePost.errors) {
      setErrors(response.data.deletePost.errors)
    } else {
      navigate('/')
    }
  }
  graphMutation(mutationString, callback)
}