import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './messageAction';
// import './index.css';

class Chat extends Component {

  constructor(props){
    super(props);
    this.state = {
      text: '',
    };
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
    this.props.isTyping({type: 'server/typing', data: {name:this.props.first_name,couple:this.props.couple_id}}); // coupleid
  }
  
  // when user presses enter, send message to server via socket which
  // emits message to ChatCard of both couple members after adding to DB
  handleKeyPress(e) {
    if (e.which === 13) {
      e.preventDefault();
      this.props.onSubmit(
        {
          type:'server/message', data: {
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
