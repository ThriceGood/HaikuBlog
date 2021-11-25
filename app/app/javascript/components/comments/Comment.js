import React, { useState } from "react";
import { Link } from "react-router-dom";
import { deleteComment, updateComment } from "../../lib/commentQueries";
import Reaction from "../reactions/Reaction";

/*
* comment component for displaying comment with its reactions
* handles updating and deleting comments
*/

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

  // handles display of comment edit form
  function switchToEdit() {
    setIsEdit(true)
  }

  // handles returning to comment text view
  function switchToView() {
    setIsEdit(false)
  }

  // updates comment via graphql query
  function handleSubmit(event) {
    event.preventDefault()
    updateComment(comment, switchToView, props.setErrors)
  }

  function handleChange(event) {
    setComment(prevState => ({ ...prevState, [event.target.name]: event.target.value}))
  }
  
  // deletes comment via graphql query
  function handleDeleteComment() {
    deleteComment(props.comment, props.setErrors)
  }

  return (
    <div>
      {comment &&
        <div>
          {isEdit
            ?
              // if is in edit mode show comment edit form
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
              // else display comment with reactions
              <div className='comment'>
                <p>{comment.text}</p> 
                <span><Link to={`/user/${comment.user.id}/posts`}> {comment.user.username}</Link> | {comment.createdAt}</span>
                <div className='reactions'>
                  <Reaction reaction_type='like' comment={comment} currentUser={props.currentUser}/>
                  <Reaction reaction_type='smile' comment={comment} currentUser={props.currentUser}/>
                  <Reaction reaction_type='thumbs_up' comment={comment} currentUser={props.currentUser}/>
                </div>
                {/* don't show edit buttons if no logged in user or not comment owner */}
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