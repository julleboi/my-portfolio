import React from 'react';
import ContactForm from './ContactForm';
import './styles.scss';

export default () => {
  return (
    <div id='contact'>
      <h1 className='mb-5'>
        You can use this form to send me a message!
      </h1>
      <ContactForm />
    </div>
  )
}