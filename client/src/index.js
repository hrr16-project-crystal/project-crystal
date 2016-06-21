// below is es6 syntax, equivalent of: var React = require('react');
  //this React import also handles the JSX syntax
import React from 'react';
// able to use { } to grab specific methods from module
  //react-dom is needed because rendering to dom is not in React import
import { render } from 'react-dom';
//browserHistory keeps track of current URL and knows how to move to a new URL
import { Router, Route, browserHistory } from 'react-router';
//need to import components index.js files to route to in Router
  //dont need to specify specific file name if using index.js convention
  //for all components
import App from './components/App';
import LandingPage from './components/LandingPage';
// require ('./index.css');

//below is JSX, route can have path and component or just 1 or the other
  //nest routes to show what is in which container
render((
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={LandingPage} />
    </Route>
  </Router>
), document.getElementById('app'));
