import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from "react-router-dom"
import { getPost, deletePost } from '../../lib/postQueries'
import Comments from '../comments/Comments'

/*
* post component for displaying post details and it's comments section
* handles deleting posts
*/

const Post = props => {
  const navigate = useNavigate()
  const [post, setPost] = useState({
    id: null, 
    title: null, 
    content: null,
    createdAt: null,
    user: {id: null}
  })
  const params = useParams()

  // get post details on mount and unset errors on unmount
  useEffect(() => {
    getPost(params.id, setPost, props.setErrors)
    return () => {
      props.setErrors('')
    }
  }, [])

  function handleDelete() { 
    deletePost(post, navigate, props.setErrors)
  }

  return (
    <div>
      {/* post details */}
      <article>
        <h3>{post.title}</h3>
        {post.content != null && post.content.split('\n').map(line => (
          <p key={line}>{line}</p>
        ))}
        {post.user.id &&
          <div className='post-details'>
            <Link to={`/user/${post.user.id}/posts`}> 
              {post.user.username}
            </Link> | <span id='post-date'>{post.createdAt}</span>
          </div>}
        {/* don't show edit buttons if no logged in user or not post owner */}
        {props.currentUser && props.currentUser.id  == post.user.id &&
          <div className='edit-links'>
            <Link to={`/post/${params.id}/edit`}>edit</Link>
            <Link to='#' onClick={handleDelete}>delete</Link>
          </div>}
      </article>
      {/* comments section */}
      <div>
        <Comments post_id={params.id} currentUser={props.currentUser} setErrors={props.setErrors}/>
      </div>
    </div>
  )

}

export default Post