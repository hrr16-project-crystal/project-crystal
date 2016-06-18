import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../Authentication/AuthActions';

class Dashboard extends Component {
  componentWillMount() {
    this.props.fetchMessage();
  }

  render() {
    return (
      <div>{this.props.message}</div>
    );
  }
}

const mapStateToProps = state => {
  return { message: state.auth.message };
};

export default connect(mapStateToProps, actions)(Dashboard);
