import React, { useState, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";
import { getPosts } from '../../lib/postQueries'
import consumer from "../../channels/consumer"

const Posts = () => {
  const cable_ref = useRef();
  const [cable, setCable] = useState(null)
  const [posts, setPosts] = useState([])

  // use to tear down subscriptions on unmout
  // https://stackoverflow.com/a/55139745/3662277
  useEffect(
    () => {
      cable_ref.current = cable;
    },
    [cable]
  );
    
  useEffect(() => {
    getPosts(setPosts)
    create_connection()
    return () => {
      cable_ref.current.unsubscribe()
    }
  }, [])

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
          <article key={post.id}>
            <h3>{post.title}</h3>
            {post.content.split('\n').map(line => (
              <p key={line}>{line}</p>
            ))}
            <div className='post-details'>{post.user.username} | {post.created_at}</div>
            <Link to={`/post/${post.id}`}>view</Link>
          </article>
        ))
      }
    </div>
  )

}

export default Posts