import axios from 'axios'

/* 
* Axios wrapper used by query helpers
*/

// getting base url from meta tag, populated from rails config
const _baseUrl = document.querySelector('[name=base_url]').content
export const baseUrl = _baseUrl

// setting csrf token in axios headers for rails authentication
const token = document.querySelector('[name=csrf-token]').content
axios.defaults.headers.common['X-CSRF-Token'] = token

const graphUrl = `${baseUrl}/graphql`

// used for all graphql queries
export function graphQuery(queryString, callback) {
  axios.post(graphUrl, {query: queryString}, {withCredentials: true}) 
  .then(response => {
    callback(response.data)
  })
  .catch(error => {console.log(error)})
}

// used for all graphql mutations
export function graphMutation(mutationString, callback) {
  axios.post(graphUrl, {query: mutationString}, {withCredentials: true}) 
  .then(response => {
    callback(response.data)
  })
  .catch(error => {console.log(error)})
}

// used for standard http gets 
export function httpGet(url, callback) {
  axios.get(url, {withCredentials: true})
    .then(response => {
      callback(response)
    })
    .catch(error => {console.log(error)})
}

// used for standard http posts 
export function httpPost(url, data, callback) {
  axios.post(url, data, {withCredentials: true})
    .then(response => {
      callback(response)
    })
    .catch(error => {console.log(error)})
}

// used for standard http deletes 
export function httpDelete(url, callback) {
  axios.delete(url, {withCredentials: true})
    .then(() => {
      callback()
    }).catch(error => {console.log(error)})
}