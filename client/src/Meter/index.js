import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './MeterActions';
import './index.css';
// import Header from '../App/Header';

class Meter extends Component {
  componentWillMount() {
    this.props.getHealth();
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
      return <div>Loading...</div>;
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
  return { health: state.meter.health };
};

export default connect(mapStateToProps, actions)(Meter);
