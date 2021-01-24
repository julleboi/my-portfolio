import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';

import Home from './components/Home';
import Terminal from './components/Terminal';
import NotFound from './components/NotFound';

import { 
  MemoryRouter as Router, 
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

ReactDOM.render(
  <Router>
    <Terminal />
    <div className='container my-4' id='links'>
      <Link to='/'>Home</Link>                |
      <Link to='/about'>About</Link>          |
      <Link to='/skills'>Skills</Link>        |
      <Link to='/projects'>My projects</Link> |
      <Link to='/contact'>Contact me</Link>
    </div>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/notfound' component={NotFound} />
      <Redirect to='/notfound' />
    </Switch>
  </Router>, document.getElementById("root"));