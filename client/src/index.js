import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './Components/App/App';
import Signin from './Components/Authentication/Signin';
import Signout from './Components/Authentication/Signout';
import Signup from './Components/Authentication/Signup';
import Dashboard from './Components/Dashboard/Dashboard';
import Quiz from './Components/Quiz/Quiz';
import requireAuth from './Components/Authentication/RequireAuth';
import LandingPage from './Components/LandingPage/LandingPage';
import Meter from './Components/Meter/Meter';
import reducers from './Helpers/rootReducer/rootReducer';
import { AUTH_USER } from './Helpers/constants/types';

import './index.css';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
// If we have a token then consider user to be signed in
if (token) {
  // need to update application state
  store.dispatch({ type: AUTH_USER });
}

// The provider Communicates with the connected components *
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
