import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams } from "react-router-dom";
import { getUserPosts } from '../../lib/postQueries'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const params = useParams()
    
  useEffect(() => {
    getUserPosts(params.user_id, setPosts)
  }, [])

  return (
    <div>
      {
        posts && posts.map(post => (
          <article key={post.id}>
            <h3>{post.title}</h3>
            {post.content.split('\n').map(line => (
              <p key={line}>{line}</p>
            ))}
            <div className='post-details'>
              <Link to={`/post/${post.id}`}>view</Link> |&nbsp;
              <Link to={`/user/${post.user.id}/posts`}> 
                {post.user.username}
              </Link> | <span id='post-date'>{post.created_at}</span>
            </div>
          </article>
        ))
      }
    </div>
  )

}

export default Posts