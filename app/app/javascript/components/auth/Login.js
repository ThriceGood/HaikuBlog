import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../lib/userQueries';

const Login = props => {
  const navigate = useNavigate()
  const [user, setUser] = useState({email: '', password: ''})

  useEffect(() => {
    return () => {
      props.setErrors('')
    }
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    login(user, props.handleLogin, navigate, props.setErrors)
  }

  function handleChange(event) {
    setUser(prevState => ({ ...prevState, [event.target.name]: event.target.value}))
  }  

  return (
    <div className='form'>
      <form onSubmit={e => { handleSubmit(e) }}>
        <input 
          type='email' 
          name='email' 
          placeholder='Email' 
          value={user.email} 
          onChange={e => { handleChange(e) }} 
          required/>
        <br/>
        <input 
          type='password' 
          name='password' 
          placeholder='Password' 
          value={user.password} 
          onChange={e => { handleChange(e) }} 
          required/>
        <br/>
        <button className='button' type='submit'>login</button>
      </form>
    </div>
  )

}

export default Login