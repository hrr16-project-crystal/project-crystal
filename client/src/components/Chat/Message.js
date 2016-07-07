import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import classnames from 'classnames';
import './message.css'; 

const Message = ({ message, user_id }) => {
  const messageClass = classnames({
    'right-align': message.user_id === user_id,
    'left-align': message.user_id !== user_id,
    'thisUser': message.user_id === user_id,
    'otherUser': message.user_id !== user_id,
  });

  const timeClass = classnames('timestamp grey-text text-lighten-2', {
    'left': message.user_id === user_id,
    'right': message.user_id !== user_id,
  });
  const messageContainerClass = classnames('messageContainer');
  const time = moment(message.created_at).calendar();

  return (
    <li className='message-item'>
              {/* <div style={paddingStyle}>  */}
              <div className={messageContainerClass}>
                <span style={{float: timeClass}} className={timeClass}>{time}</span>
                <div className={messageClass}>
                {message.content}
                </div>
              </div>
          </li>
  );
};

Message.propTypes = {
  message: PropTypes.object.isRequired,
  user_id: PropTypes.number.isRequired,
};

export default Message;
