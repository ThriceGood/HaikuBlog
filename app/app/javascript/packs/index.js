import React from 'react'
import ReactDOM from 'react-dom'
import HaikuBlog from '../components/HaikuBlog'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <HaikuBlog/>,
    document.body.appendChild(document.createElement('div')),
  )
})