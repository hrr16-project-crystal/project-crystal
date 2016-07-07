import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import MessageList from './MessageList';
import Chat from './Chat';
import _ from 'underscore';
import * as messageActionCreators from './messageAction.js';

class ChatCard extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // get all messages when the component mounts
    this.props.getMessages(this.props.user.data.couple_id);
    // if the user has not joined the couple chat room, dispatch socket action with coupleID
    if (!this.props.joined) {
      this.props.joinRoom({type: 'server/room', data: this.props.user.data.couple_id});
    }
  }

  render() {
    const notTyping = _.debounce(this.props.stopTyping, 1500); 
    if (!!this.props.typing) notTyping();
    return (
      <div className="chat-card col s12 m6 l6">
        <div className="card white card-height">
          <h5 className="center-align card__header">Chat</h5>
          <div className="card-content black-text">
            <MessageList
              user_id={this.props.user.data.user_id} 
              couple_id={this.props.user.data.couple_id} 
              messages={this.props.messages}/>
            <Chat
              first_name={this.props.user.data.first_name}
              user_id={this.props.user.data.user_id} 
              couple_id={this.props.user.data.couple_id}
              isTyping={this.props.isTyping}
              onSubmit={this.props.sendMessage}/>
              <p className='grey-text text-lighten-1'
                style={{visibility:this.props.typing?'visible':'hidden'}}>{this.props.typing} is typing...</p>
          </div>
        </div>
      </div>
    );
  }
}  

const mapStateToProps = state => {
  return {
    messages: state.messages.messages,
    typing: state.messages.typing,
    joined: state.messages.joined,
    user: state.auth.user,
  };
};            

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    stopTyping: messageActionCreators.stopTyping,
    joinRoom: messageActionCreators.joinRoom,
    isTyping: messageActionCreators.isTyping,
    sendMessage: messageActionCreators.sendMessage,
    addMessage: messageActionCreators.addMessage,
    getMessages: messageActionCreators.getMessages,
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatCard);
