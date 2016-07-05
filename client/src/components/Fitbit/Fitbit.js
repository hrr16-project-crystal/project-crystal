import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './fitbitActions';
import RaisedButton from 'material-ui/RaisedButton';

const fitbitURL = 'https://www.fitbit.com/oauth2/authorize?response_type=code&client_id';
const fitbitURL2 = 'scope=activity%20nutrition%20&expires_in=604800';
import { fitbitConfig } from '../../../../server/config';
const clientID = fitbitConfig.clientID;
const callbackURI = fitbitConfig.URI;

const style = {
  margin: 12,
};

class Fitbit extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    window.location = `${fitbitURL}=${clientID}&redirect_uri=${callbackURI}&${fitbitURL2}`;
  }

  render() {
    return (
      <RaisedButton
        label="Connect with Fitbit"
        style={style}
        primary={true}
        onTouchTap={this.handleClick}
      />
    );
  }
}

export default connect(null, actions)(Fitbit);
