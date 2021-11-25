import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deleteComment, updateComment } from "../../lib/commentQueries";
import Reaction from "../reactions/Reaction";

const Comment = props => {
  const [isEdit, setIsEdit] = useState(false)
  const [comment, setComment] = useState({
    id: props.comment.id,
    text: props.comment.text,
    postId: props.comment.postId,
    createdAt: props.comment.createdAt,
    user: props.comment.user,
    reactionInfo: JSON.parse(props.comment.reactionInfo)
  })

  function switchToEdit() {
    setIsEdit(true)
  }

  function switchToView() {
    setIsEdit(false)
  }

  function handleSubmit(event) {
    event.preventDefault()
    updateComment(comment, switchToView, props.setErrors)
  }

  function handleChange(event) {
    setComment(prevState => ({ ...prevState, [event.target.name]: event.target.value}))
  }
  
  function handleDeleteComment() {
    deleteComment(props.comment, props.setErrors)
  }

  return (
    <div>
      {comment &&
        <div>
          {isEdit
            ?
              <div className='comment-form-edit'>
                <form onSubmit={e => { handleSubmit(e) }}>
                  <textarea 
                    name="text" 
                    placeholder="Text" 
                    value={comment.text} 
                    onChange={e => { handleChange(e) }} 
                    required/>
                  <br/>
                  <button className='button' type='submit'>save comment</button>
                </form>
              </div>
            :
              <div className='comment'>
                <p>{comment.text}</p> 
                <span>{comment.user.username} | {comment.createdAt}</span>
                <div className='reactions'>
                  <Reaction reaction_type='like' comment={comment} currentUser={props.currentUser}/>
                  <Reaction reaction_type='smile' comment={comment} currentUser={props.currentUser}/>
                  <Reaction reaction_type='thumbs_up' comment={comment} currentUser={props.currentUser}/>
                </div>
                {props.currentUser && props.currentUser.id == props.comment.user.id &&
                  <div className='edit-links'>
                    <Link to='#' onClick={switchToEdit}>edit</Link><br/>
                    <Link to='#' onClick={handleDeleteComment}>delete</Link>
                  </div>
                }
              </div>
            }
        </div>
      }
    </div>
  )
}

export default Comment