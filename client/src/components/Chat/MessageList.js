import React, { Component } from 'react';
import Message from './Message'; 

const MessageList = ({ messages, user_id}) => {

      const renderMessage = (message, index) => 
        <Message
          key={message.message_id} 
          message={message}
          user_id={user_id}
        />

      return (
      <ul className='message-list'>
        {messages && messages.map(renderMessage)}
      </ul>
      );
};

export default MessageList;