import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div 
      id='terminal-titlebar' 
      className='navbar navbar-dark'
    >
      <div className='navbar-brand'>
        <Link to='/'>
          &lt;&frasl;&gt; julle.dev
        </Link>
      </div>
      <div id='terminal-titlebar-buttons'>
        <Link to='?minimized=1'>
          <span>&#95;</span>
        </Link>
        <Link to='?closed=1'>
          <span>&times;</span>
        </Link>
      </div>
    </div>
  )
}