import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Buck from './Buck';
import * as bucksActionCreators from './buckActions.js';

class BucksCard extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bucks-card col s5 m4 l3">
        <div className="row">
          <div className="card white">
            <div className="card-content black-text">
              <span className="card-title">Love Bucks</span>
              <p>Total:{this.props.total_points}</p>
                <a className="btn-floating btn-large waves-effect waves-light red"><i className="material-icons">remove</i></a>
                <a className="btn-floating btn-large waves-effect waves-light blue" onclick={()=>!('.modal').toggle()}><i className="material-icons">add</i></a>
                <div className="modal">
                  <p>How Many?</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.auth.user,
  };
};            

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    givePoints: bucksActionCreators.givePoints,
    spendPoints: bucksActionCreators.spendPoints,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BucksCard);