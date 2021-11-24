import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import { checkLogin, logout } from '../lib/userQueries'
import Posts from '../components/posts/Posts'
import PostsUser from '../components/posts/PostsUser'
import Post from '../components/posts/Post'
import PostNew from '../components/posts/PostNew'
import PostEdit from '../components/posts/PostEdit'
import Login from '../components/auth/Login'
import Registration from '../components/auth/Registration'

const HaikuBlog = () => {
  const [currentUser, setCurrentUser] = useState({id: null, username: null})

  useEffect(() => {
    checkLogin(currentUser, setCurrentUser)
  }, [])

  function handleLogin(data) {
    setCurrentUser(data.user)
  }

  const handleLogout = () => {
    logout(setCurrentUser)
  }

  return (
    <main>
      <Router>

        <nav>
          <Link to='/'><h1>HaikuBlog</h1></Link>
          <div id='welcome-text'>
            {currentUser.id &&
              `Welcome, ${currentUser.username}`}
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
        </nav>

        <section>
          <Routes>
            <Route path='/' element={<Posts/>}/>
            <Route path='/login' element={<Login handleLogin={handleLogin}/>}/>
            <Route path='/sign-up' element={<Registration handleLogin={handleLogin}/>}/>
            <Route path='/user/:user_id/posts' element={<PostsUser/>}/>
            <Route path='/post/:id' element={<Post currentUser={currentUser}/>}/>
            <Route path='/post/new' element={<PostNew currentUser={currentUser}/>}/>
            <Route path='/post/:id/edit' element={<PostEdit currentUser={currentUser}/>}/>
          </Routes>
        </section>

      </Router>
    </main>
  )

}

export default HaikuBlog