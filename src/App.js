import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import keys from './keys.json';

// keys from config (not uploaded to github)
const instanceLocator = keys.instanceLocator;
const secretKey = keys.secretKey;
const username = keys.username;
const roomId = keys.roomId;

const DUMMY_DATA = [
  {
    senderId: 'frog',
    text: 'i hate frogs!'
  },
  {
    senderId: 'messy',
    text: 'i hate frogs more lol'
  }
];

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
class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: DUMMY_DATA
    };
  }
  render() {
    return (
      <div className="container">
        {/* <Title /> */}
        <h1>{username}</h1>
        <MessageList messages={this.state.messages} />
        {/* <SendMessageForm /> */}
      </div>
    );
  }
}

export default App;
