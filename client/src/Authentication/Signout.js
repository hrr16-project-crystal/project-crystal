import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './AuthActions';
import Header from '../App/Header';

class Signout extends Component {
  componentWillMount() {
    this.props.signoutUser();
  }

  render() {
    return (
      <div>
        <Header />
        Sorry to see you go...
      </div>
    );
  }
}

export default connect(null, actions)(Signout);
