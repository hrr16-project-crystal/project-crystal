import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import App from './components/app';
import './main.css';

// provider component wraps our entire application so that it can be
// connected to our redux store, and we can access redux store in our components
render((
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={App}>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'));
