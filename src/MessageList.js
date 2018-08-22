import React, { Component } from 'react';
class MessageList extends Component {
  render() {
    return (
      <ul className="messageList">
        {this.props.messages.map(msg => {
          return (
            <li key={msg.id}>
              <div>{msg.senderId}</div>
              <div>{msg.text}</div>
            </li>
          );
        })}
      </ul>
    );
  }
}
export default MessageList;
