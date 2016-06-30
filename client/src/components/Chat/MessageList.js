import React, {Component} from 'react';
import moment from 'moment';
 
class MessageList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className='message-list'>
        {this.props.messages && this.props.messages.slice(-6).map((message, index) => {
          const messageClass = message.user_id === this.props.user_id ? 'right-align' : 'left-align';
          const timeClass = message.user_id === this.props.user_id ? 'left' : 'right';
          const time = moment(message.created_at).calendar();
          return (
            <li key={`message-${index}`} className='message-item'>
              <p className={`message ${messageClass}`}>
                {message.content}
              <span style={{float: timeClass}} className='timestamp grey-text text-lighten-2'>{time}</span>
              </p>
            </li>
          );
        })}
      </ul>
    );
  }
}

module.exports = MessageList;