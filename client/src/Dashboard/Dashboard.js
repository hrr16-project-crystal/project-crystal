import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../Authentication/AuthActions';
import Header from '../App/Header';
import Quiz from '../Quiz';
import Meter from '../Meter';

export default class Dashboard extends Component {

  render() {
    return (
      <div>
        <Header />
        <Quiz />
        <Meter />
      </div>
    );
  }
}
