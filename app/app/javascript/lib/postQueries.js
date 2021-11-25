import { graphQuery, graphMutation } from './axiosCsrf'

export function getPost(post_id, setter) {
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
  const setData = response => {
    setter(response.data.data.post)
  }
  graphQuery(queryString, setData)
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
  const setData = response => {
    setter(response.data.data.posts)
  }
  graphQuery(queryString, setData)
}

export function getUserPosts(user_id, setter) {
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
  const setData = response => {
    // errors: response.data.errors[{message: ...}]
    setter(response.data.data.user.posts)
  }
  graphQuery(queryString, setData)
}

export function createPost(post, navigate) {
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
  const nav = response => {
    // errors: response.data.errors[{message: ...}]
    navigate(`/post/${response.data.data.createPost.post.id}`)
  }
  graphMutation(mutationString, nav)
}

export function updatePost(post, navigate) {
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
  const nav = response => {
    // errors: response.data.errors[{message: ...}]
    navigate(`/post/${response.data.data.updatePost.post.id}`)
  }
  graphMutation(mutationString, nav)
}

export function deletePost(post, navigate) {
  const mutationString = `
    mutation {
      deletePost(input: {
        id: ${post.id}
      }) {
        message
      }
    }
  `
  const nav = () => {
    // errors: response.data.errors[{message: ...}]
    navigate('/')
  }
  graphMutation(mutationString, nav)
}