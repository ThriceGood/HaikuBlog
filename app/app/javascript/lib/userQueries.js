import axios from 'axios'

const baseUrl = 'http://localhost:3000'
const authenticationUrl = `${baseUrl}/authenticate`
const registrationsUrl = `${baseUrl}/registrations`
const sessionsUrl = `${baseUrl}/sessions`
const logoutUrl = `${baseUrl}/logout`

export function checkLogin(user, setter) {
  axios.get(authenticationUrl, {withCredentials: true})
    .then(response => {
      if (response.data.status === 'ok' && !user.id) {
        setter(response.data.current_user) 
      } else if (response.data.status !== 'ok' && user.id) {
        setter(response.data.current_user) 
      }
    }).catch(error => {console.log(error)})
}

export function login(user, loginHandler, navigate) {
  axios.post(sessionsUrl, {
        email: user.email,
        password: user.password
      },
      {withCredentials: true}
    ) 
    .then(response => {
      if (response.data.status === 'ok') {
        loginHandler(response.data)
      }
      navigate('/')
    }).catch(error => {console.log(error)})
}

export function logout(setter) {
  axios.delete(logoutUrl, {withCredentials: true})
    .then(() => {
      setter({id: null, username: null})
    }).catch(error => {console.log(error)})
}

export function createUser(user, loginHandler, navigate) {
  axios.post(registrationsUrl, {user: user}, {withCredentials: true}) 
  .then(response => {
    if (response.data.status === 'created') {
      loginHandler(response.data)
    }
    navigate('/')
  }).catch(error => {console.log(error)})
}