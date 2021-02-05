import React from 'react';
import { ContactFieldProps } from './ContactField';

export type ContactInputElement = HTMLInputElement |  HTMLTextAreaElement;
type ContactInputProps = ContactFieldProps & { id: string };

const DefaultProps: React.InputHTMLAttributes<ContactInputElement> = {
  required: true,
  className: 'form-control',
};

export default (props: ContactInputProps) => {
  switch (props.type) {
    case 'name':
    case 'email':
      return (
        <input 
          {...DefaultProps}
          maxLength={50}
          type={props.type}
          id={props.id}
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
      );
    case 'message':
      return (
        <textarea 
          {...DefaultProps}
          maxLength={1000}
          rows={6}
          id={props.id}
          placeholder={props.placeholder}
          onChange={props.onChange}
        />
      );
    default: 
      return (
        <input
          disabled
          className='form-control bg-danger'
          id={props.id}
          value='Bad field'
        />
      );
  }
}