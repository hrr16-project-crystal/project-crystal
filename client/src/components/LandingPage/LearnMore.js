import React, { Component } from 'react';
import './landingPage.css';
import Header from '../App/Header';
import { Link } from 'react-router';

class LearnMore extends Component {
  componentDidMount() {
    !function () {
      $('.slider').slider('pause');
      $('.slider').slider('start');
      $('.slider').slider('next');
      $('.slider').slider('prev');
      $('.slider').slider({full_width: true, interval: 10000});
    }();
  }

  render() {
    return (
      <div className="hero">
        <div className="hero__overlay">
          <div className="hero__header">
            <Header />
          </div>
          
          <div className="learn__box slider">
            <ul className="slides">
              <li>
                <img src="http://lorempixel.com/580/250/nature/1"></img>
                <div className="caption center-align">
                  <h3>Date Night Recommendations</h3>
                  <h5 className="light grey-text text-lighten-3">Find the perfect restaurant.</h5>
                </div>
              </li>
              <li>
                <img src="../../assets/1.jpg"></img>
                <div className='something'></div>
                <div className="caption left-align">
                  <h3>Calendar</h3>
                  <h5 className="light grey-text text-lighten-3">Small Calendar.</h5>
                </div>
              </li>
              <li>
                <img src="../../assets/16.jpg"></img>
                <div className="caption right-align">
                  <h3>Todo's</h3>
                  <h5 className="light grey-text text-lighten-3">Small todo's.</h5>
                </div>
              </li>
              <li>
                <img src="../../assets/9.jpg"></img>
                <div className="caption center-align">
                  <h3>Quiz</h3>
                  <h5 className="light grey-text text-lighten-3">Small quiz.</h5>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </div>
    );
  }
}

export default LearnMore;
