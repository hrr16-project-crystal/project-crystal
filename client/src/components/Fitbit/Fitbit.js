import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './fitbitActions';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

const fitbitURL = 'https://www.fitbit.com/oauth2/authorize?response_type=code&client_id';
const scope = 'scope=activity%20nutrition';
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
    this.getActivity = this.getActivity.bind(this);
  }

  componentDidMount() {
    this.props.fitbitAccessToken(this.props.user.data.user_id);
  }

  getActivity() {
    const aToken = this.props.accessToken.data.access_token;
    axios.get('https://api.fitbit.com/1/user/-/activities/steps/date/today/7d.json', {
      headers: { authorization: `Bearer ${aToken}` },
    })
    .then(response => {
      console.log(response);
    })
    .catch(err => {
      console.log(err);
    });
  }

  handleClick() {
    const userID = this.props.user.data.user_id;
    window.open(`${fitbitURL}=${clientID}&redirect_uri=${callbackURI}&${scope}&state=${userID.toString()}`);
  }

  render() {
    return (
      <div>
        <RaisedButton
          label="Connect with Fitbit"
          style={style}
          primary={true}
          onTouchTap={this.handleClick}
        />
        <RaisedButton
          label="Get activity"
          style={style}
          secondary={true}
          onTouchTap={this.getActivity}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.auth.user, accessToken: state.fitbit.accessToken };
};

export default connect(mapStateToProps, actions)(Fitbit);
