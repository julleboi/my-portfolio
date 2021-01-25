import React from 'react';

type TerminalTitlebarProps = {
  cb: () => void;
};

export default (props: TerminalTitlebarProps) => {
  return (
    <div 
      id='terminal-titlebar' 
      className='navbar navbar-dark'
    >
      <span className='navbar-brand'>
        &lt;&frasl;&gt; julle.dev
      </span>
      <a 
        id='terminal-titlebar-hide'
        href='#'
        onClick={props.cb}
      >
        <span>&#95;</span>
      </a>
    </div>
  )
}