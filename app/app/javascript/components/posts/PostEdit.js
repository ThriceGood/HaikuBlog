import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { getPost, updatePost } from '../../lib/postQueries';

/*
* post edit component for updating posts
*/

const PostEdit = props => {
  const navigate = useNavigate()
  const params = useParams()
  const [post, setPost] = useState({id: params.id, title: '', content: ''})


  // get post details on mount and unset errors on unmount
  useEffect(() => {
    getPost(params.id, setPost)
    return () => {
      props.setErrors('')
    }
  }, [])

  // update post on form submit
  function handleSubmit(event) {
    event.preventDefault()
    updatePost(post, navigate, props.setErrors)
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
          placeholder="Content" 
          value={post.content} 
          onChange={e => { handleChange(e) }} 
          required/>
        <br/>
        <button className='button' type='submit'>save post</button>
      </form>
      <Link to={`/post/${params.id}`}>back</Link>
    </div>
  )

}

export default PostEdit