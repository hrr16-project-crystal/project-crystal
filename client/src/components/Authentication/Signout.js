import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './authAction';
<<<<<<< eee4d10ac0295d9dcd949d903cc535630d975626:client/src/Components/Authentication/Signout.js
import Header from '../App/Header';
=======
import Header from '../App/header';
>>>>>>> Refactor directory structure:client/src/Components/Authentication/Signout.js

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
