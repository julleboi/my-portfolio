import React from 'react';
import ContactInput, { ContactInputElement } from './ContactInput';

export type ContactFieldProps = {
  type: 'name' | 'email' | 'message';
  onChange?: (event: React.ChangeEvent<ContactInputElement>) => void
  placeholder?: string;
}

export default (props: ContactFieldProps) => {
  const inputId = `${props.type}-field`;
  return (
    <div className='form-group'>
      <label htmlFor={inputId} className='text-capitalize'>
        {props.type}
      </label>
      <ContactInput 
        id={inputId} 
        type={props.type} 
        onChange={props.onChange} 
        placeholder={props.placeholder}
      />
    </div>
  );
}