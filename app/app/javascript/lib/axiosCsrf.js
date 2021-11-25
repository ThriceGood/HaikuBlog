import axios from 'axios'

const _baseUrl = document.querySelector('[name=base_url]').content
export const baseUrl = _baseUrl

const graphUrl = `${baseUrl}/graphql`

const token = document.querySelector('[name=csrf-token]').content
axios.defaults.headers.common['X-CSRF-Token'] = token

export const httpClient = axios

export function graphQuery(queryString, callback) {
  axios.post(graphUrl, {query: queryString}, {withCredentials: true}) 
  .then(response => {
    callback(response)
  })
  .catch(error => {console.log(error)})
}

export function graphMutation(mutationString, callback) {
  axios.post(graphUrl, {query: mutationString}, {withCredentials: true}) 
  .then(response => {
    callback(response)
  })
  .catch(error => {console.log(error)})
}

export function httpGet(url, callback) {
  axios.get(url, {withCredentials: true})
    .then(response => {
      callback(response)
    })
    .catch(error => {console.log(error)})
}

export function httpPost(url, data, callback) {
  
  axios.post(url, data, {withCredentials: true})
    .then(response => {
      callback(response)
    })
    .catch(error => {console.log(error)})
}

export function httpDelete(url, callback) {
  axios.delete(url, {withCredentials: true})
    .then(() => {
      callback()
    }).catch(error => {console.log(error)})
}