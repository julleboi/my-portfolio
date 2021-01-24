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
    console.log(input);
    switch (input) {
      case "clear":
        setLines([]);
        break;
      case "help":
        setLines([...lines, [input, 'Sorry, can\'t help you. :(']]);
        break;
      case "skills":
        setLines([...lines,
          [input, 'My skills include:'],
          ['', '- Something'],
          ['', '- Something else']
        ]);
        break;
      default:
        setLines([...lines, [input, `Command '${input}' not found.`]]);
    }
  }

  const linesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    linesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  return(
    <div className='container-fluid mt-3' id='terminal'>
      <TerminalTitlebar />
      <div id='terminal-lines-container' className='p-3'>
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