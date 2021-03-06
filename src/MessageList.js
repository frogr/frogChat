import React, { Component } from 'react';
const names = [
  'frog',
  'bullfrog',
  'toad',
  'salamander',
  'lizard',
  'gecko',
  'chameleon',
  'tadpole',
  'alligator',
  'newt'
];
class MessageList extends Component {
  render() {
    return (
      <ul className="messageList" id="messages">
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
