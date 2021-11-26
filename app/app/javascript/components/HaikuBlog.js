import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { checkLogin, logout } from '../lib/userQueries'
import Posts from './posts/Posts'
import PostsUser from './posts/PostsUser'
import Post from './posts/Post'
import PostNew from './posts/PostNew'
import PostEdit from './posts/PostEdit'
import Login from './auth/Login'
import Registration from './auth/Registration'

/* 
* main top level component containing navigation and routes
*/

const HaikuBlog = () => {
  const [currentUser, setCurrentUser] = useState({id: null, username: null})
  const [errors, setErrors] = useState('')

  // check login session on load to set current user
  useEffect(() => {
    checkLogin(currentUser, setCurrentUser)
  }, [])

  // login function used by login component
  function handleLogin(data) {
    setCurrentUser(data.user)
  }

  // logout function used by logout component
  const handleLogout = () => {
    logout(setCurrentUser)
  }

  return (
    <main>
      <Router>
        {/* sidebar navigation */}
        <nav>
          <Link to='/'><h1>HaikuBlog</h1></Link>
          <div id='welcome-text'>
            {currentUser.id &&
              `welcome, ${currentUser.username}`}
          </div>
          {currentUser.id 
            ?
              <div>
                <div>
                  <Link to='/post/new'>new post</Link>
                </div>
                <div>
                  <Link to='#' onClick={handleLogout}>logout</Link>
                </div>
              </div>
            :
              <div>
                <div>
                  <Link to='/login'>login</Link>
                </div>
                <div>
                  <Link to='/sign-up'>sign up</Link>
                </div>
              </div>}
              <div id='error-messages'>
                {errors && 
                  <p>{errors}</p>
                }
              </div>
        </nav>
        {/* main section where child routes render */}
        <section>
          <Routes>
            <Route path='/' element={<Posts/>}/>
            <Route path='/login' element={<Login handleLogin={handleLogin} setErrors={setErrors}/>}/>
            <Route path='/sign-up' element={<Registration handleLogin={handleLogin} setErrors={setErrors}/>}/>
            <Route path='/user/:user_id/posts' element={<PostsUser/>}/>
            <Route path='/post/:id' element={<Post currentUser={currentUser} setErrors={setErrors}/>}/>
            <Route path='/post/new' element={<PostNew currentUser={currentUser} setErrors={setErrors}/>}/>
            <Route path='/post/:id/edit' element={<PostEdit currentUser={currentUser} setErrors={setErrors}/>}/>
          </Routes>
        </section>
      </Router>
    </main>
  )
}

export default HaikuBlog