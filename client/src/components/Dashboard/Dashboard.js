import React, { Component } from 'react';
import { connect } from 'react-redux';
// import * as actions from './meterAction';
import Header from '../App/Header';
import Meter from '../Meter/Meter';
import ChatCard from '../Chat/ChatCard';
import CalendarCard from '../Calendar/CalendarCard';
import img from '../../assets/10.jpg';
import './dashboard.css';

class Dashboard extends Component {
  componentDidMount() {
    !function () {
      $('.parallax').parallax();
    }();
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
        <div className="dashContainer">
          <Meter />
        </div>
        <div className="row">
          <ChatCard />
          <CalendarCard />
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
