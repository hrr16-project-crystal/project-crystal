import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './MeterActions';
import './index.css';

class Meter extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     //  this will pull from db
  //     //  only pull in if answered is true
  //     //  input is true if the answer was yes, false if answer was no
  //     health: [
  //       {name: "question1", input: true, answered: true},
  //       {name: "question2", input: true, answered: true},
  //       {name: "question3", input: true, answered: true},
  //     ],
  //     spontaneity: 1,
  //   };
  // }

  // componentWillMount() {
  //   this.getHealth();
  // }
  //  this logic will go server side
  // createAlgorithm (...args) => { 
  //   for(let i = 0; i < this.state.health; i++){
  //     let value = this.state.health[i];
  //     switch(value.name){
  //       case 'question1':
  //         if(value.input === true){
  //           this.state.spontaneity++;
  //         }
  //       case 'question2':
  //         if(value.input === true){
  //           this.state.spontaneity++;
  //         }
  //       case 'question3':
  //         if(value.input === true){
  //           this.state.spontaneity++;
  //         }
  //     }
  //   }
  // };

  //  replace URL once available
  //  use axios and return from get request will be an object with all scores
  // getHealth() {
  //   $.ajax({
  //    type: 'GET',
  //    contentType: 'application/json',
  //    url: '/api/health',
  //    success: health => this.setState({ health: health }),
  //  });
  // }
  render() {
    return (
      <h1>Hello World!</h1>
    );
  }
}
/*
      <div className="health-meter">
<<<<<<< 96a1e9a3b04c1bb70f2f9297ce7e330f6798df27
        <div className="overall-meter">{this.props.health.total}</div>
        <div className="spontaneity-meter">{this.props.health.spontaneity}</div>
        <div className="helpful-meter">{this.props.health.helpful}</div>
        <div className="romance-meter">{this.props.health.romance}</div>
        <div className="generosity-meter">{this.props.health.generosity}</div>
=======
        <div className="overall-meter">Ok</div>
        <div className="spontaneity-meter"></div>
        <div className="helpful-meter"></div>
        <div className="romance-meter"></div>
        <div className="generosity-meter"></div>
>>>>>>> Began work on the meter component router
      </div>
*/

const mapStateToProps = state => {
  return { health: state.meter };
};

export default connect(mapStateToProps, actions)(Meter);
