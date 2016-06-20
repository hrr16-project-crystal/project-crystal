import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../Authentication/AuthActions';
import Header from '../App/Header';

class Dashboard extends Component {
  // componentWillMount() {
  //   this.props.fetchMessage();
  // }
  // const divStyle = {
  //   backgroundColor: 'yellow'
  // };

  render() {
    return (
      <div style={{ backgroundColor: 'yellow' }}>
        <Header />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { message: state.auth.message };
};

export default connect(mapStateToProps, actions)(Dashboard);
