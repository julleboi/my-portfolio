import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import TerminalInput from './TerminalInput';
import TerminalLine from './TerminalLine';
import TerminalTitlebar from './TerminalTitlebar';

const INITIAL_LINES: [string, string][] = [
  ['', ' Available commands:'                    ],
  ['', ' - cd <new_dir> [ Changes directories ]' ],
  ['', ' - clear        [ Clears all lines    ]' ],
  ['', ' - help         [ Lists all commands  ]' ],
];

export default () => {
  const history = useHistory();
  const [lines, setLines] = useState<[string, string][]>(INITIAL_LINES);

  const handleInput = (input: string) => {
    const [ command, ...params ] = input.split(' ');
    switch (command) {
      case 'cd':
        if (params.length === 1) {
          history.push(params[0]);
        }
        break;
      case 'clear':
        setLines([]);
        break;
      case 'help':
        setLines([...lines, ...INITIAL_LINES]);
        break;
      default:
        setLines([...lines, [input, `Command '${command}' not found.`]]);
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