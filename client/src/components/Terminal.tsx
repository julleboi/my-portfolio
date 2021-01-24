import React, { useState, useEffect, useRef } from 'react';
import TerminalInput from './TerminalInput';
import TerminalLine from './TerminalLine';
import TerminalTitlebar from './TerminalTitlebar';

const INITIAL_LINES: [string, string][] = [
  ['', 'Welcome to my portfolio!']
];

export default () => {
  const [lines, setLines] = useState<[string, string][]>(INITIAL_LINES);

  const handleInput = (input: string) => {
    // TODO: Handle input
    const output = '';
    setLines([...lines, [input, output]]);
  }

  const linesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    linesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  return(
    <div className='container-fluid mt-3' id='terminal'>
      <TerminalTitlebar />
      <div id='terminal-lines-container'>
        {
          lines.map(([i, o], idx) => 
            <TerminalLine key={idx} input={i} output={o} />
          )
        }
      <div key='linesEnd' ref={linesEndRef} />
      </div>
      <TerminalInput cb={handleInput} />
    </div>
  );
}