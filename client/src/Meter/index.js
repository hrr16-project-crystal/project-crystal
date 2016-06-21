import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './MeterActions';
import './index.css';

class Meter extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    this.props.getHealth();
  }

  render() {
    return (
      <div className="health-meter">
        <div className="overall-meter">{this.props.health.total}</div>
        <div className="spontaneity-meter">{this.props.health.spontaneity}</div>
        <div className="helpful-meter">{this.props.health.helpful}</div>
        <div className="romance-meter">{this.props.health.romance}</div>
        <div className="generosity-meter">{this.props.health.generosity}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { health: state.meter };
};

export default connect(mapStateToProps, actions)(Meter);
