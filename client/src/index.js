import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/App/App';
import Signin from './components/Authentication/Signin';
import Signout from './components/Authentication/Signout';
import Signup from './components/Authentication/signup';
import Dashboard from './components/Dashboard/dashboard';
import Quiz from './components/Quiz/Quiz';
import requireAuth from './components/Authentication/requireAuth';
import LandingPage from './components/LandingPage/LandingPage';
import Meter from './components/Meter/Meter';
import reducers from './helpers/rootReducer/rootReducer';
import { AUTH_USER } from './helpers/constants/types';

import './index.css';

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
        <Route path="meter" component={Meter} />
        <Route path="quiz" component={Quiz} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('app'));
