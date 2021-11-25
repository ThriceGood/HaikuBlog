import React, { useState, useEffect, useRef } from "react";
import { getComments, createComment } from "../../lib/commentQueries";
import consumer from "../../channels/consumer"
import Comment from "./Comment";

/*
* comments component displays all comments and handles creating comments 
* displays new comments and comment deletion in realtie via ActionCable
*/

const Comments = props => {
  const cable_ref = useRef();
  const [cable, setCable] = useState(null)
  const [comments, setComments] = useState(null)
  const [formComment, setFormComment] = useState({
    post_id: props.post_id, 
    user_id: props.currentUser.id,
    text: ''
  })

  // use to tear down subscriptions on unmout
  // https://stackoverflow.com/a/55139745/3662277
  useEffect(() => {
    cable_ref.current = cable;
  }, [cable])

  // get initial list of comments and create ActionCable connection
  useEffect(() => {
    getComments(props.post_id, setComments, props.setErrors)
    create_connection()
    // unsubscribe from cable on unmount
    return () => {
      cable_ref.current.unsubscribe()
    }
  }, [])

  // connect to cable and display new comment updates
  function create_connection() {
    const cable_subscription = consumer.subscriptions.create({
      channel: "CommentChannel", 
      post_id: props.post_id}, {
      received(data) {
        setComments(data.comments)
      }
    });
    setCable(cable_subscription)
  }

  // creates new comment and unsets form data
  function handleSubmit(event) {
    event.preventDefault()
    createComment(formComment, props.setErrors)
    setFormComment({
      post_id: props.post_id, 
      user_id: props.currentUser.id, 
      text: ''
    })
  }

  function handleChange(event) {
    setFormComment(prevState => ({ ...prevState, [event.target.name]: event.target.value}))
  }

  return (
    <div>
      {props.currentUser.id &&
        // comment form
        <div className='comment-form'>
          <form onSubmit={e => { handleSubmit(e) }}>
            <textarea
              name="text" 
              placeholder="Text"
              value={formComment.text} 
              onChange={e => { handleChange(e) }} 
              required/>
            <br/>
            <button className='button' type='submit'>comment</button>
          </form>
        </div>}
      {
        // display all comments
        comments && comments.map(comment => (
          <div key={`comment-${comment.id}`}>
            <Comment comment={comment} currentUser={props.currentUser} setErrors={props.setErrors}/>
          </div>
        ))
      }
    </div>
  )

}

export default Comments