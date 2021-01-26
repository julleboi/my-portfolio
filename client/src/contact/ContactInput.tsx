import React from 'react';

type ContactInputProps = {
  type: 'name' | 'email' | 'message';
  placeholder?: string;
}

export default (props: ContactInputProps) => {
  const name = props.type;
  const id = `${props.type}-input`;

  switch (props.type) {
    case 'name':
    case 'email':
      return (
        <div className='contact-input'>
          <label className='text-capitalize' htmlFor={id}>
            {name}
          </label>
          <input
            type={props.type}
            className='form-control'
            id={id}
            placeholder={props.placeholder}
          />
        </div>
      );

    case 'message':
      return (
        <div className='contact-input'>
          <label className='text-capitalize' htmlFor={id}>
            {name}
          </label>
          <textarea
            className='form-control'
            id={id}
            placeholder={props.placeholder}
          />
        </div>
      );

    default:
      throw new Error(`Unknown ContactInput type ${props.type}`);
  }
}
