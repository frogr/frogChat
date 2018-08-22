import React, { Component } from 'react';
import { animateScroll } from 'react-scroll';
class SendMessageForm extends Component {
  constructor() {
    super();
    this.state = {
      message: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  scrollToBottom() {
    animateScroll.scrollToBottom({
      containerId: 'messages'
    });
  }
  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState(
      {
        message: ''
      },
      this.scrollToBottom
    );
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="send-message-form">
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
export default SendMessageForm;
