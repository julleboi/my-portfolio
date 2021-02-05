import React from 'react';

type TerminalTitlebarProps = {
  cb: () => void;
};

export default (props: TerminalTitlebarProps) => {
  return (
    <div id='terminal-titlebar' className='navbar navbar-primary'>
      <span className='navbar-brand'>
        &lt;&frasl;&gt; julle.dev
      </span>
      <a href='#' onClick={props.cb}>
        <span>&#95;</span>
      </a>
    </div>
  )
}