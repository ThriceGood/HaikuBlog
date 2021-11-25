import { baseUrl, httpGet, httpPost, httpDelete, graphMutation } from './axiosCsrf'

const authenticationUrl = `${baseUrl}/authenticate`
const sessionsUrl = `${baseUrl}/sessions`
const logoutUrl = `${baseUrl}/logout`

export function checkLogin(user, setter) {
  const setUser = response => {
    if (response.data.status === 'ok' && !user.id) {
      setter(response.data.current_user) 
    } else if (response.data.status !== 'ok' && user.id) {
      setter(response.data.current_user) 
    }
  }
  httpGet(authenticationUrl, setUser)
}

export function login(user, loginHandler, navigate) {
  const data = {email: user.email, password: user.password}
  const handleLogin = response => {
    if (response.data.status === 'ok') {
      loginHandler(response.data.user)
    }
    navigate('/')
  }
  httpPost(sessionsUrl, data, handleLogin)
}

export function logout(setter) {
  const unsetCurrentUser = () => {
    setter({id: null, username: null})
    // need to fully refresh on logout 
    // to refresh the csrf token
    window.location = '/'
  }
  httpDelete(logoutUrl, unsetCurrentUser)
}

export function createUser(user, loginHandler, navigate) {
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
  const login = response => {
    loginHandler(response.data.data.createUser.user)
    navigate('/')
  }
  graphMutation(mutation_query, login)
}