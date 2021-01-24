import React from 'react';

type TerminalInputProps = {
  cb: (newLine: string) => void
};

export default (props: TerminalInputProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Enter': 
        if (event.currentTarget.value) {
          props.cb(event.currentTarget.value);
          event.currentTarget.value = '';
        }
      default:
    }
  }

  return (
    <div 
      className='input-group' 
      id='terminal-input'
    >
      <span 
        className='input-group-text'
        id='terminal-input-prefix'
      >
        guest@julle.dev: ~$
      </span>
      <input 
        type='text' 
        className='form-control'
        id='terminal-input-field' 
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}