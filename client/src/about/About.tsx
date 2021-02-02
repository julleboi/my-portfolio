import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div id='about'>
      <p>
        My name is Julius Turunen, I am a Computer Science student at 
        Aalto University, on the verge of graduation. 
      </p>
      <p>
        I am interested in web development and I have experience with
        TypeScript and React. However, I am very motivated to learn
        new technologies, such as WebAssembly more recently. To get a
        better picture, you can take a look at my <Link to='/projects'>
        projects</Link> to see what I have been working on recently.
      </p>
      <p>
        My GitHub is <a href='https://github.com/julleboi'>
        github.com/julleboi</a>.
      </p>
    </div>
  );
}