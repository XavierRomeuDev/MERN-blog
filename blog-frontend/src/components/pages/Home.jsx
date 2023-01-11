import React from 'react'
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className='jumbo'>
      <h1>Welcome to a React Blog</h1>
      <p>Blog developed with the MERN Stack (MongoDB, Express, React, Node.js)</p>
      <Link to='/articles' className='button'> Go to article list</Link>
    </div>
  )
}
