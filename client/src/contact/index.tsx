import React, { useState, useRef } from 'react';
import ContactInput from './ContactInput';

export default () => { 
  const [response, setResponse] = useState<string>();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = nameRef.current!.value;
    const email = emailRef.current!.value;
    const message = messageRef.current!.value;
    const body = JSON.stringify({ name, email, message });
    fetch('http://localhost:3000/dev/contact', {method: 'post', body})
      .then(res => res.json())
      .then((res: { response: string }) => res.response)
      .then(setResponse, setResponse);
  }

  if (response) {
    return (
      <div id='contact'>
        <h1 id='contact-response'>{response}</h1>
      </div>
    );
  }

  return (
    <div id='contact'>
      <form id='contact-form' onSubmit={handleSubmit}>
        <ContactInput type='name' placeholder='Your name' ref={nameRef} />
        <ContactInput type='email' placeholder='Your email adress' ref={emailRef} />
        <ContactInput type='message' placeholder='Write here' ref={messageRef} />
        <button type='submit' className='btn btn-primary'>Send</button>
      </form>
    </div>
  );
}