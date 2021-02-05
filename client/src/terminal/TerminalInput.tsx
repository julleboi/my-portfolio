import React from 'react';
import { useLocation } from 'react-router-dom';

type TerminalInputProps = {
  cb: (input: string) => void;
};

export default (props: TerminalInputProps) => {
  const location = useLocation();

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Enter': 
        const input = event.currentTarget.value;
        if (input) {
          props.cb(input);
          event.currentTarget.value = '';
        }
        break;
      default:
    }
  }

  return (
    <div className='input-group' id='terminal-input'>
      <span className='input-group-text' id='terminal-input-prefix'>
        guest@julle.dev: ~{location.pathname}$
      </span>
      <input 
        type='text' 
        className='form-control'
        id='terminal-input-field'
        onKeyDown={handleKeyDown}
        autoFocus={true}
      />
    </div>
  );
}