import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";
import { getPosts } from '../../lib/postQueries'
import consumer from "../../channels/consumer"

/*
* posts component for displaying all posts on index
* displays live post edits via ActionCable
*/

const Posts = () => {
  const cable_ref = useRef();
  const [cable, setCable] = useState(null)
  const [posts, setPosts] = useState([])

  // use to tear down subscriptions on unmout
  // https://stackoverflow.com/a/55139745/3662277
  useEffect(() => {
    cable_ref.current = cable;
  }, [cable])
    
  // get initial posts list and creates ActionCable connection
  useEffect(() => {
    getPosts(setPosts)
    create_connection()
    // unsubscribe from cable on unmount
    return () => {
      cable_ref.current.unsubscribe()
    }
  }, [])

  // subscribe to cable and set new post updates
  function create_connection() {
    const cable_subscription = consumer.subscriptions.create("PostChannel", {
      received(data) {
        setPosts(data.posts)
      }
    });
    setCable(cable_subscription)
  }

  return (
    <div>
      {
        posts && posts.map(post => (
          <article key={`post-${post.id}`}>
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