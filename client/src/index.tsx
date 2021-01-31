import React from 'react';
import ReactDOM from 'react-dom';
import './styles.scss';

import Terminal from './terminal';
import Home from './home';
import About from './about';
import Projects from './projects';
import Contact from './contact';
import NotFound from './notfound';

import { 
  BrowserRouter as Router, 
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

ReactDOM.render(
  <Router>
    <div id='links'>
      <Link to='/'>Home</Link>                |
      <Link to='/about'>About</Link>          |
      <Link to='/projects'>Projects</Link>    |
      <Link to='/contact'>Contact</Link>
    </div>
    <div id='content'>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/about' component={About} />
        <Route exact path='/projects' component={Projects} />
        <Route exact path='/contact' component={Contact} />
        <Route exact path='/notfound' component={NotFound} />
        <Redirect to='/notfound' />
      </Switch>
    </div>
    <Terminal />
  </Router>, document.getElementById("root"));