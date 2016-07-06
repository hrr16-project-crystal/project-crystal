import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import Buck from './Buck';
import Spend from './Spend';
import History from './History';
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
      <div className="bucks-card col s12 m6 l4" style={{height:'324px'}}>
        <div className="card white" >
          <div className="card-content">
            <h5 className="center-align">Lovebucks</h5>
            <p>Total: {this.props.lovebucks.user_points}</p>
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