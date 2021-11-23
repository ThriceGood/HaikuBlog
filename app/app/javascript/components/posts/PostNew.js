import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../../lib/postQueries';

const PostNew = props => {
  const navigate = useNavigate()
  const [post, setPost] = useState({title: '', content: '', user_id: props.currentUser.id})

  function handleSubmit(event) {
    event.preventDefault()
    createPost(post, navigate)
  }

  function handleChange(event) {
    setPost(prevState => ({ ...prevState, [event.target.name]: event.target.value}))
  }  

  return (
    <div className='form'>
      <form onSubmit={e => { handleSubmit(e) }}>
        <input 
          type="text" 
          name="title" 
          placeholder="Title" 
          value={post.title}
          onChange={e => { handleChange(e) }} 
          required/>
        <br/>
        <textarea 
          name="content" 
          placeholder="Haiku goes here..." 
          value={post.content} 
          onChange={e => { handleChange(e) }} 
          required/>
        <br/>
        <button className='button' type='submit'>create post</button>
      </form>
    </div>
  )

}

export default PostNew