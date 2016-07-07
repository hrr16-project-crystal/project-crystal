import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from './fitbitActions';
import * as buckActionCreators from '../LoveBucks/buckActions';
import RaisedButton from 'material-ui/RaisedButton';
import axios from 'axios';

const fitbitURL = 'https://www.fitbit.com/oauth2/authorize?response_type=code&client_id';
const scope = 'scope=activity%20nutrition';
// import { fitbitConfig } from '../../../../server/config';
const fitbitConfig = {
  // clientID: process.env.FIT_CLIENTID,
  clientID: '227VRH',
  // clientSecret: process.env.FIT_CLIENTSECRET,
  clientSecret: '9f8477ffa2a7d1a168febef2e2b457d6',
  //callbackURI: process.env.FIT_URI,
  callbackURI: 'http://sparkq.us/auth/fitbit/callback',
};
const clientID = fitbitConfig.clientID;
const callbackURI = fitbitConfig.callbackURI;

let authToken1 = '';
let authToken2 = '';
let userId1 = '';
let userId2 = '';
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
    let loserUserID = '';
    let loserName = '';
    const userId1Loser = this.props.partnerToken.data[1].user_id
    const userName1Loser = this.props.partnerToken.data[1].first_name;
    const userId2Loser = this.props.partnerToken.data[0].user_id;
    const userName2Loser = this.props.partnerToken.data[0].first_name;
    const coupleID = this.props.partnerToken.data[0].couple_id;

    if (user1Stats >= user2Stats) {
      loserUserID = userId1Loser;
      loserName = userName1Loser;
    } else {
      loserUserID = userId2Loser;
      loserName = userName2Loser;
    }
    const pointsToGive = {
      points: 25,
      memo: 'Won Fitbit',
      couple_id: coupleID,
      user_id: loserUserID,
      type: 0,
      name: loserName,
    };

    this.props.givePoints(pointsToGive);
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
    console.log(clientID);
    console.log(process.env.FIT_CLIENTID);
    console.log(fitbitConfig.clientID);
    window.open(`${fitbitURL}=${clientID}&redirect_uri=${callbackURI}&${scope}&state=${userID.toString()}`);
  }

  render() {
    return (
      <div>
        <RaisedButton
          label="Connect Fitbit"
          style={style}
          onTouchTap={this.handleClick}
          backgroundColor="#fff59d"
        />
        <RaisedButton
          label="Compare Stats!"
          style={style}
          backgroundColor="#fff59d"
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

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    givePoints: buckActionCreators.givePoints,
    fitbitAccessToken: actions.fitbitAccessToken,
    partnerFitbitAccessToken: actions.partnerFitbitAccessToken,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Fitbit);
