import React, { useState, useRef } from 'react';

export default () => { 
  const [response, setResponse] = useState<string>();
  const nameFieldRef = useRef<HTMLInputElement>(null);
  const emailFieldRef = useRef<HTMLInputElement>(null);
  const messageFieldRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameFieldRef.current!.value;
    const email = emailFieldRef.current!.value;
    const message = messageFieldRef.current!.value;
    const body = JSON.stringify({ name, email, message });
    fetch('http://localhost:3000/dev/contact', {method: 'post', body})
      .then(res => res.json())
      .then((res: { response: string }) => res.response)
      .then(res => setResponse(res), err => setResponse(err));
  }

  if (response) {
    return (
      <div id='contact'>
        <h1 id='contact-response'>
          { response }
        </h1>
      </div>
    );
  }

  return (
    <div id='contact'>
      <form 
        id='contact-form'
        onSubmit={handleSubmit}
      >
        <label htmlFor='name-input'>
          Name
        </label>
        <input 
          type='name' 
          className='form-control' 
          id='name-input'
          placeholder='Your name'
          ref={nameFieldRef}
        />
        <label htmlFor='email-input'>
          Email adress
        </label>
        <input 
          type='email' 
          className='form-control' 
          id='email-input'
          placeholder='Your email'
          ref={emailFieldRef}
        />
        <label htmlFor='message-input'>
          Message
        </label>
        <textarea 
          className='form-control' 
          id='message-input'
          placeholder='Write here'
          ref={messageFieldRef}
        />
        <button 
          type='submit' 
          className='btn btn-primary'
        >
          Send
        </button>
      </form>
    </div>
  );
}