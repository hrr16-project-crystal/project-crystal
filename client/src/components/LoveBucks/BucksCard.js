import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Buck from './Buck';
import Spend from './Spend';
import History from './History';
import Fitbit from '../Fitbit/Fitbit';
import * as bucksActionCreators from './buckActions.js';
import RaisedButton from 'material-ui/RaisedButton';

class BucksCard extends Component {

  constructor(props) {
    super(props);
  }

  getPoints = () => {
    this.props.getLovebuckInfo(this.props.user.data.couple_id);
  }

  render() {
    return (
      <div className="bucks-card col s12 m6 l6">
        <div className="card white card-height" >
          <h5 className="center-align card__header">Lovebucks: {this.props.lovebucks.totalPoints === 0 ? this.props.user.data.love_bucks : this.props.lovebucks.totalPoints}</h5>
          <div className="card-content">
            <div className="col s12 m6 l6">
              <p className="inner-card__header">Manage</p>
              <Buck user={this.props.user}
                    givePoints={this.props.givePoints}
                    lovebucks={this.props.lovebucks}
                    spendPoints={this.props.spendPoints}/>
              <Spend user={this.props.user}
                    givePoints={this.props.givePoints}
                    lovebucks={this.props.lovebucks}
                    spendPoints={this.props.spendPoints}/>
              <History user={this.props.user}
                    lovebucks={this.props.lovebucks}
                    getLovebuckInfo={this.props.getLovebuckInfo}/>
            </div>
            <div className="col s12 m6 l6">
              <p className="inner-card__header">Fitbit</p>
              <Fitbit />
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
    lovebucks: state.lovebucks,
  };
};            

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    givePoints: bucksActionCreators.givePoints,
    getLovebuckInfo: bucksActionCreators.getLovebuckInfo,
    spendPoints: bucksActionCreators.spendPoints,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(BucksCard);