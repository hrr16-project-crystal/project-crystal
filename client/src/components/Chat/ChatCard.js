import React, { Component } from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import MessageList from './MessageList';
import Chat from './Chat';
import * as messageActionCreators from './messageAction.js';
import io from 'socket.io-client';

let socket = null;

const mapStateToProps = state => {
  return {
    messages: state.messages.messages,
    user: state.auth.user,
  };
};            

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    addMessage: messageActionCreators.addMessage,
    updateMessage: messageActionCreators.updateMessage,
    getMessages: messageActionCreators.getMessages,
  }, dispatch);
};

class ChatCard extends Component {

  constructor(props) {
    super(props);
    this.state = {
      typing: false,
    };
  }

  // gets all messages for this couple when page loads
  componentWillMount() {
    socket = io.connect();
  }

  componentDidMount() {
    socket.on('connect', () =>{
      socket.emit('room', this.props.user.data.couple_id) // 4 should be coupleId
    });

    // get all messages when the component mounts
    this.props.getMessages(this.props.user.data.couple_id);
    // on new message, updates state with new message
    socket.on('message', data => {
      this.props.addMessage(data.data);
    });

    // makes "typing ..." visible when other user is typing
    socket.on('typing', (id) => {
      if (id.slice(2) !== socket.id){
        this.setState ({ typing: true });
        setTimeout(
          () => { this.setState ({ typing: false })}, 1000);
      }
    });
  }

  render() {
    return (
      <div className="chat-card">
        <div className="row">
          <div className="col s12 m6 l4">
            <div className="card white">
              <div className="card-content black-text">
                <span className="card-title">Chat</span>
                <MessageList
                  user_id={this.props.user.data.user_id} 
                  couple_id={this.props.user.data.couple_id} 
                  messages={this.props.messages}/>
                <Chat
                  user_id={this.props.user.data.user_id} 
                  couple_id={this.props.user.data.couple_id}
                  socket={socket}
                  value={this.props.content}
                  onSubmit={this.props.addMessage}/>
                  <p style={{visibility:this.state.typing?'visible':'hidden'}}>typing ...</p>
              </div>
              <div className="card-action">
                <a href="#">Go to Chat</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}  



export default connect(mapStateToProps, mapDispatchToProps)(ChatCard);