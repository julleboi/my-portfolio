import React from 'react';

export default () => 
  <div id='contact'>
    <form id='contact-form'>
      <label htmlFor='name-input'>
        Name
      </label>
      <input 
        type='name' 
        className='form-control' 
        id='name-input'
        placeholder='Your name'
      />
      <label htmlFor='email-input'>
        Email adress
      </label>
      <input 
        type='email' 
        className='form-control' 
        id='email-input'
        placeholder='Your email'
      />
      <label htmlFor='message-input'>
        Message
      </label>
      <textarea 
        className='form-control' 
        id='message-input'
        placeholder='Write here'
      />
      <button 
        type='submit' 
        className='btn btn-primary'
      >
        Send
      </button>
    </form>
  </div>