import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from "react-router-dom"
import { getPost, deletePost } from '../../lib/postQueries'
import Comments from '../comments/Comments'

const Post = props => {
  const navigate = useNavigate()
  const [post, setPost] = useState({
    id: null, 
    title: null, 
    content: null,
    created_at: null,
    user: {id: null}
  })
  const params = useParams()

  useEffect(() => {
    getPost(params.id, setPost)
  }, [])

  function handleDelete() { 
    deletePost(post, navigate)
  }

  return (
    <div>
      <article>
        <h3>{post.title}</h3>
        {post.content != null && post.content.split('\n').map(line => (
          <p key={line}>{line}</p>
        ))}
        {post.user.id &&
          <div className='post-details'>{post.user.username} | {post.created_at}</div>}
        {props.currentUser && props.currentUser.id  == post.user.id &&
          <div className='edit-links'>
            <Link to={`/post/${params.id}/edit`}>edit</Link>
            <Link to='#' onClick={handleDelete}>delete</Link>
          </div>}
      </article>
      <div>
        <Comments post_id={params.id} currentUser={props.currentUser}/>
      </div>
    </div>
  )

}

export default Post