import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import keys from './keys.json';
import { ChatKit, ChatManager, TokenProvider } from '@pusher/chatkit';

// keys from config (not uploaded to github)
const instanceLocator = keys.instanceLocator;
const secretKey = keys.secretKey;
const tokenURL = keys.tokenURL;
const username = keys.username;
const roomId = Number(keys.roomId);

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
class SendMessageForm extends Component {
  constructor() {
    super();
    this.state = {
      message: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({
      message: ''
    });
  }
  render() {
    return (
      <form className="sendMessageForm">
        <input
          onChange={this.handleChange}
          value={this.state.message}
          placeholder="type your message here"
          type="text"
        />
      </form>
    );
  }
}
function Title() {
  return <p className="title">frogChat</p>;
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      messages: DUMMY_DATA
    };
  }
  componentDidMount() {
    const chatManager = new ChatManager({
      instanceLocator: instanceLocator,
      userId: username,
      tokenProvider: new TokenProvider({
        url: tokenURL
      })
    });
    chatManager.connect().then(currentUser => {
      this.currentUser = currentUser;
      currentUser.subscribeToRoom({
        roomId: roomId,
        hooks: {
          onNewMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      });
    });
  }
  sendMessage(text) {
    this.currentUser.sendMessage({
      text: text,
      roomId: roomId
    });
  }
  render() {
    return (
      <div className="container">
        <Title />
        {/* <h1>{username}</h1> */}
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
      </div>
    );
  }
}

export default App;
