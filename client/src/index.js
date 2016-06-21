import React from 'react';
import { render } from 'react-dom';
<<<<<<< HEAD
//browserHistory keeps track of current URL and knows how to move to a new URL
import { Router, Route, browserHistory } from 'react-router';
//need to import components index.js files to route to in Router
  //dont need to specify specific file name if using index.js convention
  //for all components
import App from './components/App';
import LandingPage from './components/LandingPage';
// require ('./index.css');
=======
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './App/';
import Signin from './Authentication/Signin';
import Signout from './Authentication/Signout';
import Signup from './Authentication/Signup';
import Dashboard from './Dashboard/Dashboard';
import Quiz from './Quiz/index';
import requireAuth from './Authentication/RequireAuth';
import LandingPage from './LandingPage/';
import reducers from './rootReducer';
import { AUTH_USER } from './constants/types';

import './index.css';
>>>>>>> 96a1e9a3b04c1bb70f2f9297ce7e330f6798df27

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If we have a token then consider user to be signed in
if (token) {
  // need to update application state
  store.dispatch({ type: AUTH_USER });
}

// The provider communicates with the connected components*
render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={LandingPage} />
        <Route path="signin" component={Signin} />
        <Route path="signout" component={Signout} />
        <Route path="signup" component={Signup} />
        <Route path="dashboard" component={requireAuth(Dashboard)} />
        <Route path="quiz" component={Quiz} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('app'));
