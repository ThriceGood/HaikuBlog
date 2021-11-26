import { baseUrl, httpGet, httpPost, httpDelete } from './axiosCsrf'

/* 
* user query helpers for CRUDing users and handling authentication
*/

const authenticationUrl = `${baseUrl}/authenticate`
const registrationsUrl = `${baseUrl}/registrations`
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
  const callback = response => {
    if (response.data.status === 'created') {
      loginHandler(response.data.user)
      navigate('/')
    } else {
      setErrors('registration failed')
    }
  }
  httpPost(registrationsUrl, {user: user}, callback)
}