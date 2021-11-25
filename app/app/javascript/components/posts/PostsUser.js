import React, { useState, useEffect, useRef } from 'react'
import { Link, useParams } from "react-router-dom";
import { getUserPosts } from '../../lib/postQueries'

/*
* user posts component for displaying all posts related to single user
*/

const Posts = () => {
  const [posts, setPosts] = useState([])
  const params = useParams()
    
  // get user posts on mount 
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
              </Link> | <span id='post-date'>{post.createdAt}</span>
              <div>{post.commentCount} comments</div>
            </div>
          </article>
        ))
      }
    </div>
  )

}

export default Posts