import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as actions from './meterAction';
import Header from '../App/Header';
import Meter from '../Meter/Meter';
import ChatCard from '../Chat/ChatCard';
import BucksCard from '../LoveBucks/BucksCard';
import CalendarCard from '../Calendar/CalendarCard';
import TodoCard from '../ToDo/TodoCard';
import Fitbit from '../Fitbit/Fitbit';
import img from '../../assets/10.jpg';
import './dashboard.css';

class Dashboard extends Component {
  componentDidMount() {
    !function () {
      $('.parallax').parallax();
    }();

    // // Check URL query parameters for acces_token
    // const URL = this.props.params.access_token // Not sure if access_token refers to whole URL or extracts access_token from URL
    // // If exists,
    // if (URL) {
    //   // Send action to the reducer
    //   action.type = STORE_FITBIT_TOKEN;
    // }


  }

  render() {
    return (
      <div>
        <Header />
        <div className="parallax-container">
          <div className="hero__overlay">
            <div className="parallax"><img src={img}/></div>
          </div>
        </div>
        <div className="row">
          <Meter />
          <ChatCard />
          <CalendarCard />
          <BucksCard />
          <TodoCard />
          <Fitbit />
        </div>
      </div>
    );
  }

}

// const mapStateToProps = state => {
//   return {
//     health: state.meter.health,
//     user: state.auth.user,
//   };
// };
export default connect(null, null)(Dashboard);
