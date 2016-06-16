import React from 'react';
import { render } from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';
import App from './components/App';
import LandingPage from './components/LandingPage';
import './index.css';

render((
  <Router history={browserHistory}>
    <Route component={App}>
      <Route path="/" component={LandingPage} />
    </Route>
  </Router>
), document.getElementById('app'));
