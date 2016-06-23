import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../App/header';
import Quiz from '../Quiz/quiz.js';
import Meter from '../Meter/meter';

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
