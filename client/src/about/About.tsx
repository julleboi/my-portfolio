import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

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
        serverless (AWS Lambda) more recently.
      </p>
      <p id='about-last'>
        You can get a better grasp of my skills by having a look at 
        my <Link to='/projects'>projects</Link>, to see what I have
        been working on recently.
      </p>
    </div>
  );
}