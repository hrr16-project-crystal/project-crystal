import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './messageAction';
import _ from 'underscore';
// import './index.css';

class Chat extends Component {

  constructor(props){
    super(props);
    this.state = {
      text: '',
    };
  }

  // on mount, set up throttled "user is typing" function
  componentWillMount(){
    let type = function(){
      return this.props.socket.emit('typing', 
        {type:'server/typing', 
        payload: this.props.couple_id});
    };
    let delayedType = _.throttle(type, 500);
  }

  // renders chat input
  render() {
    return (
      <div className='message-entry-box'>
        <textarea
          name='message'
          placeholder='Enter a message'
          value={this.state.text}
          onChange={this.handleChange.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}/>
      </div>
    );
  }

  // Updates text value and lets other couple user that user is typing
  handleChange(e) {
    this.setState({
      text: e.target.value,
    }); 
    this.props.socket.emit('typing', this.props.couple_id);//coupleid
  }
  
  // when user presses enter, send message to server via socket which
  // emits message to ChatCard of both couple members after adding to DB
  handleKeyPress(e) {
    if (e.which === 13) {
      e.preventDefault();
      this.props.socket.emit('action',
        {type:'server/message',payload:{
          content: this.state.text,
          user_id: this.props.user_id,//this.props.userID,
          couple_id: this.props.couple_id,//this.props.coupleID,
        }
      });
      this.state.text = '';
    }
  }
}

export default Chat;
