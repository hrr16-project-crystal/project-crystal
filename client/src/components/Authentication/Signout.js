import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './authAction';
<<<<<<< d4356f4a5f8b7328365717c84cc3175da9b977b5
<<<<<<< eee4d10ac0295d9dcd949d903cc535630d975626:client/src/Components/Authentication/Signout.js
import Header from '../App/Header';
=======
import Header from '../App/header';
>>>>>>> Refactor directory structure:client/src/Components/Authentication/Signout.js
=======
import Header from '../App/Header';
>>>>>>> Refactor directory

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
