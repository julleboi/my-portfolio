import React from 'react';

type StarsBadgeProps = {
  count: number;
}

export default (props: StarsBadgeProps) => {
  return (
    <span className='badge-base'>
      {props.count} &#9733;
    </span>
  );
}