import React from 'react';

type TerminalLineProps = {
  input: string
  output: string
};

export default (props: TerminalLineProps) => 
  <div className='terminal-line'>
    {
      props.input
        ? `< ${props.input}`
        : props.output
    }
    <br/>
    {
      props.input
        ? `> ${props.output}`
        : ''
    }
  </div>