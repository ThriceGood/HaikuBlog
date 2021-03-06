import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { createUser } from '../../lib/userQueries';

/*
* registration component containing user registration form
* handles creation of user
*/

const Registration = props => {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    username: '', 
    email: '', 
    password: '',
    password_confirmation: ''
  })

  useEffect(() => {
    return () => {
      props.setErrors('')
    }
  }, [])

  // create user and login if successful
  function handleSubmit(event) {
    event.preventDefault()
    createUser(user, props.handleLogin, navigate, props.setErrors)
  }

  // updates user state with every form input change
  function handleChange(event) {
    setUser(prevState => ({ ...prevState, [event.target.name]: event.target.value}))
  }  

  return (
    <div className='form'>
      <form onSubmit={e => { handleSubmit(e) }}>
        <input 
          type="username" 
          name="username" 
          placeholder="Username" 
          value={user.username} 
          onChange={e => { handleChange(e) }} 
          required/>
        <br/>
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={user.email} 
          onChange={e => { handleChange(e) }} 
          required/>
        <br/>
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          value={user.password} 
          onChange={e => { handleChange(e) }} 
          required/>
        <br/>
        <input 
          type="password" 
          name="password_confirmation" 
          placeholder="Password confirmation" 
          value={user.password_confirmation} 
          onChange={e => { handleChange(e) }} 
          required/>
        <br/>
        <button className='button' type='submit'>register</button>
      </form>
    </div>
  )

}

export default Registration