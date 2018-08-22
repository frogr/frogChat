import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import keys from './keys.json';
import { ChatKit, ChatManager, TokenProvider } from '@pusher/chatkit';
import MessageList from './MessageList';
import SendMessageForm from './SendMessageForm';
import Title from './Title';
import { animateScroll } from 'react-scroll';

// keys from config (not uploaded to github)
const instanceLocator = keys.instanceLocator;
const secretKey = keys.secretKey;
const tokenURL = keys.tokenURL;
const username = keys.username;
const roomId = Number(keys.roomId);

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
    this.sendMessage = this.sendMessage.bind(this);
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
      this.currentUser.subscribeToRoom({
        roomId: roomId,
        hooks: {
          onNewMessage: message => {
            this.setState(
              {
                messages: [...this.state.messages, message]
              },
              this.scrollToBottom
            );
          }
        }
      });
    });
  }
  sendMessage(text) {
    this.currentUser.sendMessage({
      text,
      roomId: roomId
    });
  }
  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: 'messages'
    });
  }
  render() {
    return (
      <div className="app">
        <Title />
        <MessageList
          roomId={this.state.roomId}
          messages={this.state.messages}
        />
        <SendMessageForm sendMessage={this.sendMessage} />
      </div>
    );
  }
}

export default App;
