import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './meterAction';
import './meter.css';

class Meter extends Component {
  componentWillMount() {
    this.props.getHealth(this.props.user.coupleID);
  }

  renderStats() {
    return (
      <div className="container">
        <table>
          <thead>
          <tr>
            <th className="center-align">Relationship Health Score</th>
          </tr>
          </thead>
          <tbody>
            <tr>
              <td>Total Score</td>
              <td>{this.props.health.data[0].score}</td>
            </tr>
            <tr>
              <td>Respect</td>
              <td>{this.props.health.data[0].respect_score}</td>
            </tr>
            <tr>
              <td>Communication</td>
              <td>{this.props.health.data[0].communication_score}</td>
            </tr>
            <tr>
              <td>Intimacy</td>
              <td>{this.props.health.data[0].intimacy_score}</td>
            </tr>
            <tr>
              <td>Generosity</td>
              <td>{this.props.health.data[0].generosity_score}</td>
            </tr>
            <tr>
              <td>Spontaneity</td>
              <td>{this.props.health.data[0].spontaneity_score}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    if (!this.props.health) {
      return (
        <div>
          <span>Loading!!!!!!!!!</span>
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div><div className="gap-patch">
                <div className="circle"></div>
              </div><div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="container">
        {this.renderStats()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    health: state.meter.health,
    user: state.auth.user,
  };
};

export default connect(mapStateToProps, actions)(Meter);
