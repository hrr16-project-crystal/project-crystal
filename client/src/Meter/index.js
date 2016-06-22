import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './MeterActions';
import './index.css';
import Header from '../App/Header';

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
              <td>{this.props.health.total}</td>
            </tr>
            <tr>
              <td>Spantaneity</td>
              <td>{this.props.health.spontaneity}</td>
            </tr>
            <tr>
              <td>Helpfulness</td>
              <td>{this.props.health.helpful}</td>
            </tr>
            <tr>
              <td>Romance</td>
              <td>{this.props.health.romance}</td>
            </tr>
            <tr>
              <td>Generosity</td>
              <td>{this.props.health.generosity}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  render() {
    if(!this.props.health) {
      return <div>Loading...</div>
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
