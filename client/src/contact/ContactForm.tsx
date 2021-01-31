import React, { useState } from 'react';
import ContactField from './ContactField';

export default () => { 
  const [isSending, setIsSending] = useState<boolean>(false);
  const [response, setResponse] = useState<string>();
  const [name, setName] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [message, setMessage] = useState<string>();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !email || !message) {
      setResponse('Please fill all fields.');
      return;
    }
    setIsSending(true);
    fetch('/api/contact', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name, email, message})
    })
      .then(res => res.json())
      .then(({response}) => setResponse(response))
      .catch(err => {
        console.error(err);
        setResponse('Could not send the message. :(');
      });
    setIsSending(false);
  }

  return (
    <form id='contact-form' onSubmit={handleSubmit}>
      <h3 id='contact-response' className={response ? '' : 'hide'}>
        {response}
      </h3>
      <ContactField 
        type='name' 
        placeholder='Your name' 
        onChange={e => setName(e.currentTarget.value)} 
      />
      <ContactField 
        type='email' 
        placeholder='Your email adress' 
        onChange={e => setEmail(e.currentTarget.value)}
      />
      <ContactField 
        type='message' 
        placeholder='Write here' 
        onChange={e => setMessage(e.currentTarget.value)}
      />
      <button type='submit' className='btn btn-primary' disabled={isSending}>
        {isSending ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
}