import React, { Component } from 'react';
class MessageList extends Component {
  render() {
    return (
      <ul className="messageList">
        {this.props.messages.map(msg => {
          return (
            <li key={msg.id}>
              <span className="senderId">{msg.senderId}</span>
              :
              <span className="msgText"> {msg.text}</span>
            </li>
          );
        })}
      </ul>
    );
  }
}
export default MessageList;
