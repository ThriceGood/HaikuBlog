import { baseUrl, httpGet, httpPost, httpDelete, graphMutation } from './axiosCsrf'

/* 
* user query helpers for CRUDing users and handling authentication
*/

const authenticationUrl = `${baseUrl}/authenticate`
const sessionsUrl = `${baseUrl}/sessions`
const logoutUrl = `${baseUrl}/logout`

export function checkLogin(user, setter) {
  const callback = response => {
    if (response.data.status === 'ok' && !user.id) {
      setter(response.data.current_user) 
    } else if (response.data.status !== 'ok' && user.id) {
      setter(response.data.current_user) 
    }
  }
  httpGet(authenticationUrl, callback)
}

export function login(user, loginHandler, navigate, setErrors) {
  const data = {email: user.email, password: user.password}
  const callback = response => {
    if (response.data.status === 'ok') {
      loginHandler(response.data.user)
      navigate('/')
    } else {
      setErrors('wrong email or password')
    }
  }
  httpPost(sessionsUrl, data, callback)
}

export function logout(setter) {
  const callback = () => {
    setter({id: null, username: null})
    // to refresh the csrf token
    window.location = '/'
  }
  httpDelete(logoutUrl, callback)
}

export function createUser(user, loginHandler, navigate, setErrors) {
  const mutation_query = `
    mutation {
      createUser(input:{
        username: "${user.username}"
        email: "${user.email}"
        password: "${user.password}"
        passwordConfirmation: "${user.password_confirmation}"
      }) {
        user {
          id
          username
        }
        errors
      }
    }
  `
  const callback = response => {
    if (response.data.createUser.errors) {
      setErrors(response.data.createUser.errors)
    } else {
      loginHandler(response.data.createUser.user)
      navigate('/')
    }
  }
  graphMutation(mutation_query, callback)
}