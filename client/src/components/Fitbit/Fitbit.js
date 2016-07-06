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

let authToken1 = '';
let authToken2 = '';
let userId1 = '';
let userId2 ='';
let user1Stats = 0;
let user2Stats = 0;

const style = {
  margin: 12,
};

class Fitbit extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.getActivity = this.getActivity.bind(this);
    this.compareStats = this.compareStats.bind(this);
  }

  componentDidMount() {
    this.props.fitbitAccessToken(this.props.user.data.user_id);
    this.props.partnerFitbitAccessToken(this.props.user.data.couple_id);
    setTimeout(() => {
      authToken1 = this.props.partnerToken.data[0].access_token;
      authToken2 = this.props.partnerToken.data[1].access_token;
      userId1 = this.props.partnerToken.data[0].fitbit_id;
      userId2 = this.props.partnerToken.data[1].fitbit_id;
    }, 1000);
    setTimeout(() => {
      axios.get(`https://api.fitbit.com/1/user/${userId1}/activities/steps/date/today/7d.json`, {
        headers: { authorization: `Bearer ${authToken1}` },
      })
      .then(response => {
        const activities = response.data['activities-steps'];
        for (let i = 0; i < activities.length; i++) {
          const stepValue = Number(activities[i].value);
          user1Stats += stepValue;
        }
      })
      .catch(err => {
        console.log(err);
      });
    }, 1800);
    setTimeout(() => {
      axios.get(`https://api.fitbit.com/1/user/${userId2}/activities/steps/date/today/7d.json`, {
        headers: { authorization: `Bearer ${authToken2}` },
      })
      .then(response => {
        const activities = response.data['activities-steps'];
        for (let i = 0; i < activities.length; i++) {
          const stepValue = Number(activities[i].value);
          user2Stats += stepValue;
        }
      })
      .catch(err => {
        console.log(err);
      });
    }, 2500);
  }

  compareStats() {
    console.log(user1Stats);
    console.log(user2Stats);
    // Compare both variables and see which is the highest
      // Whoever has the highest count, increase their lovebucks score by x
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
        <RaisedButton
          label="Compare Stats!"
          style={style}
          primary={true}
          onTouchTap={this.compareStats}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
    accessToken: state.fitbit.accessToken,
    partnerToken: state.fitbit.partnerToken,
  };
};

export default connect(mapStateToProps, actions)(Fitbit);
