/*
1. Sets up testing environment to run like a browser in the command line
2. Builds 'renderComponent' helper that renders a given react class
3. Builds helper for simulating events
4. Sets up chai-jquery
*/

import _$ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
// JsDom emulates the DOM in the terminal for Node.js apps
import jsdom from 'jsdom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from '../helpers/rootReducer/rootReducer';
import 'ignore-styles';

// Equivalent to the browser's window.document
// Initializes and sets up an HTML snippet/fake DOM into the terminal
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
global.navigator = global.window.navigator;
// Define our own instance of jQuery.
// Don't try to find the real DOM, just be responsible for the fake DOM
// This hooks jQuery to our fake DOM
const $ = _$(window);

// Sets up chai jQuery
chaiJquery(chai, chai.util, $);

// Takes a React Component class, render it and get the HTML
// and wrap it with the jQuery element and it return that jQuery element
// this function takes a ComponentClass, component level props, and initial state
// These parameters are used in the actual test files
function renderComponent(ComponentClass, props = {}, state = {}) {
  // Spin off a copy of the class and render that component using TestUtils
  const componentInstance = TestUtils.renderIntoDocument(
    // When we create a Redux store we need to pass in our reducers
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );
  // this produces HTML
  return $(ReactDOM.findDOMNode(componentInstance));
}

// Adds the simulate function to every jQuery instance
$.fn.simulate = function (eventName, value) {
  // Updates the value of the HTML value if one was passed im
  if (value) {
    // Val is a jQuery method that updates the value of the HTML element
    this.val(value);
  }
  // Gets access to the element that was selected with 'this'
  // Uses React tests utils with the passed in eventName and then the
  // first element in the array selector
  // for $('div').simulate(...)
  TestUtils.Simulate[eventName](this[0]);
};

export { renderComponent, expect };
