// // below is es6 syntax, equivalent of: var React = require('react');
//   // this React import also handles the JSX syntax
// import React from 'react';
// // able to use { } to grab specific methods from module
//   // react-dom is needed because rendering to dom is not in React import
// import { render } from 'react-dom';
// // browserHistory keeps track of current URL and knows how to move to a new URL
// import { Router, Route, browserHistory } from 'react-router';
// // need to import components index.js files to route to in Router
//   // dont need to specify specific file name if using index.js convention
//   // for all components
// import App from './components/app/index';
// import LandingPage from './components/LandingPage';
// import './index.css';

// // below is JSX, route can have path and component or just 1 or the other
//   // nest routes to show what is in which container
// render((
//   <Router history={browserHistory}>
//     <Route component={App}>
//       <Route path="/" component={LandingPage} />
//     </Route>
//   </Router>
// ), document.getElementById('app'));

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app/';
import Signin from './Authentication/Signin';
import Signout from './Authentication/Signout';
import Signup from './Authentication/Signup';
import Dashboard from './Dashboard/Dashboard';
import requireAuth from './Authentication/RequireAuth';
import Welcome from './Authentication/Welcome';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If we have a token then consider user to be signed in
if (token) {
  // need to update application state
  store.dispatch({ type: AUTH_USER });
}

// The provider communicates with the connected components*
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Welcome} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="signup" component={Signup} />
        <Route path="dashboard" component={requireAuth(Dashboard)} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('app'));
