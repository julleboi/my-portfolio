import React from 'react';

type TerminalLineProps = {
  input: string
  output: string
};

export default (props: TerminalLineProps) =>  {
  const Inner = () => {
    if (props.input) {
      return (
        <React.Fragment>
          {`< ${props.input}`}
          <br />
          {`> ${props.output}`}
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        {props.output}
      </React.Fragment>
    );
  }

  return (
    <div className='terminal-line'>
      <Inner />
    </div>
  );
}