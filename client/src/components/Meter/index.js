import React, { Component } from 'react';
import './index.css';

class Meter extends Component {
  constructor(props){
    super(props);
    this.state = {
      //  this will pull from db
      //  only pull in if answered is true
      //  input is true if the answer was yes, false if answer was no
      health: [
        {name: "question1", input: true, answered: true},
        {name: "question2", input: true, answered: true},
        {name: "question3", input: true, answered: true},
      ],
      spontaneity: 1,
    };
  }

  componentWillMount(){
    this.getHealth();
  }
  //  this logic will go server side
  createAlgorithm (...args) => { 
    for(let i = 0; i < this.state.health; i++){
      let value = this.state.health[i];
      switch(value.name){
        case 'question1':
          if(value.input === true){
            this.state.spontaneity++;
          }
        case 'question2':
          if(value.input === true){
            this.state.spontaneity++;
          }
        case 'question3':
          if(value.input === true){
            this.state.spontaneity++;
          }
      }
    }
  };

  //  replace URL once available
  //  use axios and return from get request will be an object with all scores
  getHealth(){
    $.ajax({
     type: 'GET',
     contentType: 'application/json',
     url: '/api/health',
     success: health => this.setState({ health: health }),
   });
  }

  render() {
    return (
      <div className="health-meter">
      //  each div will be a category with its own bar graph and score
        <div className="overall-meter"></div>
        <div className="spontaneity-meter"></div>
        <div className="helpful-meter"></div>
        <div className="romance-meter"></div>
        <div className="generosity-meter"></div>
      </div>
    );
  }
}

Meter.PropTypes = {};
Meter.defaultProps = {};

export default Meter;