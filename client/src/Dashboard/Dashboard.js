import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../Authentication/AuthActions';
import Header from '../App/Header';
import Quiz from '../Quiz';

export default class Dashboard extends Component {
  // componentWillMount() {
  //   this.props.fetchMessage();
  // }

  render() {
    return (
      <div>
        <Header />
        <Quiz />
      </div>
    );
  }
}

// const mapStateToProps = state => {
//   return { message: state.auth.message };
// };

// export default connect(mapStateToProps, actions)(Dashboard);
