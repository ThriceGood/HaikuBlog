import React, { useState, useEffect, useRef } from "react"
import consumer from "../../channels/consumer"

const Reaction = props => {
  const [reactionsCount, setReactionsCount] = useState(0)
  const [reactionUserIds, setReactionUserIds] = useState([])
  const [cable, setCable] = useState(null)
  const cable_ref = useRef();

  // use to tear down subscriptions on unmout
  // https://stackoverflow.com/a/55139745/3662277
  useEffect(() => {
    cable_ref.current = cable;
  }, [cable]);

  useEffect(() => {
    if (props.comment.reactionInfo) {
      setReactionsCount(props.comment.reactionInfo[props.reaction_type].count)
      setReactionUserIds(props.comment.reactionInfo[props.reaction_type].user_ids)
    }
    create_connection()
    return () => {
      cable_ref.current.unsubscribe()
    }
  }, [])

  function create_connection() {
    const cable_subscription = consumer.subscriptions.create({
      channel: "ReactionChannel", 
      comment_id: props.comment.id, 
      reaction_type: props.reaction_type}, {
      received(data) {
        setReactionsCount(data.count)
        setReactionUserIds(data.user_ids)
      }
    });
    setCable(cable_subscription)
  }

  function handleReaction(action) {
    cable.send({
      commit: action,
      comment_id: props.comment.id, 
      user_id: props.currentUser.id, 
      reaction_type: props.reaction_type
    })
  }

  function is_disabled() {
    return !props.currentUser.id || props.comment.user.id == props.currentUser.id
  }

  function if_reaction_has_current_user_id() {
    if (props.currentUser) {
      return reactionUserIds.includes(props.currentUser.id)
    } else {
      return false
    }
  }

  function reaction_icon(reaction_type) {
    switch (reaction_type) {
      case 'like':
        return <i className="fas fa-heart"></i>
      case 'smile':
        return <i className="fas fa-smile"></i>
      case 'thumbs_up':
        return <i className="fas fa-thumbs-up"></i>
    }
  }

  return (
    <div>
      <div>
        {if_reaction_has_current_user_id()
          ?
            <button
              className='did_react'
              disabled={is_disabled()} 
              onClick={() => {handleReaction('delete')}}>{reaction_icon(props.reaction_type)} {reactionsCount}</button>
          :
            <button 
              disabled={is_disabled()} 
              onClick={() => {handleReaction('create')}}>{reaction_icon(props.reaction_type)} {reactionsCount}</button>
        }
      </div>
    </div>
  )

}

export default Reaction