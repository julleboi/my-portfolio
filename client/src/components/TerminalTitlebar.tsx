import React from 'react';

export default () => 
  <div 
    id='terminal-titlebar' 
    className='navbar navbar-dark'
  >
    <a 
      className='navbar-brand'
      href='#'
    >
      &lt;&frasl;&gt; julle.dev
    </a>
    <div id='terminal-titlebar-buttons'>
      <a 
        className='text-light'
        href='#'
      >
        <span>&#95;</span>
      </a>
      <a 
        className='text-light ml-3'
        href='#'
      >
        <span>&times;</span>
      </a>
    </div>
  </div>