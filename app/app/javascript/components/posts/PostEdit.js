import React, { useState, useEffect } from 'react'
import { useParams, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { getPost, updatePost } from '../../lib/postQueries';

const PostEdit = () => {
  const navigate = useNavigate()
  const params = useParams()
  const [post, setPost] = useState({id: params.id, title: '', content: ''})

    useEffect(() => {
      getPost(params.id, setPost)
    }, [])

  function handleSubmit(event) {
    event.preventDefault()
    updatePost(post, navigate)
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