import axios_csrf from './axiosCsrf'

const reactionUrl = 'http://localhost:3000/reaction'

export function getReactions(reaction_type, comment_id, setter) {
  const getReactionsUrl = `${reactionUrl}/${comment_id}/${reaction_type}`
  axios_csrf().get(getReactionsUrl, {withCredentials: true})
    .then(response => {
      const reactions = response.data.reactions
      setter(prevState => ({...prevState, reactions: reactions}))
    })
    .catch(error => {console.log(error)})
}

export function createReaction(comment_id, user_id, reaction_type, setter) {
  axios_csrf().post(reactionUrl, {
    reaction: {
      user_id: user_id, 
      comment_id: comment_id, 
      reaction_type: reaction_type}
    }, 
    {withCredentials: true})
    .then(response => {
      const reactions = response.data.reactions
      setter(prevState => ({...prevState, reactions: reactions}))
    })
    .catch(error => {console.log(error)})
}

export function deleteReaction(reaction, setter) {
  axios_csrf().delete(`${reactionUrl}/${reaction.id}`, {withCredentials: true})
    .then(() => {
      setter(prevState => ({...prevState, id: 0}))
    })
    .catch(error => {console.log(error)})
}