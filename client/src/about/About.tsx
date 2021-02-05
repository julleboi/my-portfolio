import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div id='about'>
      <p>
        My name is Julius Turunen, I am a Computer Science student
        at Aalto University, on the verge of graduation.
      </p>
      <p>
        I am interested in web development, and I have experience 
        with TypeScript and React. However, I am totally motivated 
        to learn about new technologies, such as WebAssembly and 
        serverless more recently.
      </p>
      <p>
        Get a better grasp of my skills by having a look at 
        my <i className='fab fa-github-alt'/> <Link to='/projects'>
        projects</Link>, to see what I have been working on more 
        recently.
      </p>
    </div>
  );
}