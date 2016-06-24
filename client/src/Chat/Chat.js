import React, { Component } from 'react';
import { connect } from 'react-redux';
// import './index.css';

class Chat extends Component {
  componentWillMount() {
    this.props.getHealth(this.props.user.coupleID);
  }
  socket.on('chat msg', function (msg) {
    $scope.$applyAsync(function () {
      $scope.chatLog.push(msg);
    });
  });

  renderStats() {
    return (
      <div className="messages">
        
      </div>
    );
  }

  render() {
    return (
      <div className='message-entry-box'>
        <textarea
          name='message'
          placeholder='Enter a message'
          value={this.props.value}
          onChange={this.handleChange.bind(this)}
          onKeyPress={this.handleKeyPress.bind(this)}/>
      </div>
    );
  }
 
  handleChange(ev) {
    this.props.onChange(ev.target.value);
  }
 
  handleKeyPress(ev) {
    if (ev.which === 13) {
      const trimmedMessage = this.props.value.trim();
 
      if (trimmedMessage) {
        this.props.onSubmit(trimmedMessage);
      }
 
      ev.preventDefault();
    }
  }
}

const mapStateToProps = state => {
  return { 
    user: state.auth.user
  };
};

export default connect(mapStateToProps, actions)(Chat);
