import React from 'react';
import ReactDOM from 'react-dom';
import { 
  BrowserRouter as Router, 
  Switch,
  Route,
  Link,
  Redirect
} from 'react-router-dom';

import Terminal from './terminal';
import Home from './home';
import About from './about';
import Projects from './projects';
import Contact from './contact';
import NotFound from './notFound';

import './styles.scss';

ReactDOM.render(
  <Router>
    <div id='links'>
      <Link to='/'>Home</Link>                |
      <Link to='/about'>About me</Link>       |
      <Link to='/projects'>My projects</Link> |
      <Link to='/contact'>Contact me</Link>
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