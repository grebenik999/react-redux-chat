import React, {Component} from 'react';
import ChatHeader from './ChatHeader';
import {Input} from 'antd';

export default class MessageArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      date: new Date().toLocaleString(),
      activeChat: null,
    };
  }

  handleTextAreaChange = event => {
    let user = localStorage.getItem('user');
    user = JSON.parse(user);
    this.setState({
      text: event.target.value,
      fromUser: user,
      activeChat: this.props.chatWith.chatID,
    });
  };

  formSubmit = e => {
    e.preventDefault();
    this.setState({text: ''});
  };

  render() {
    const postMessageToDB = this.props.postMessageToDB;
    const writeMessage = this.props.writeMessage;
    const chatWith = this.props.chatWith;
    const allUsers = this.props.allUsers;
    return (
      <div className='chat'>
        <ChatHeader chooseLogin={allUsers} writeMessageTo={chatWith} />
        <div className='chat-history'>
          <ul>
            {chatWith.chatID != null ? (
              <li>
                <div className='message-data'>
                  <span className='message-data-name'>
                    <i className='fa fa-circle online' /> Alex
                  </span>
                  <span className='message-data-time'>10:12 AM, Today</span>
                </div>
                <div className='message my-message'>Are we meeting today?</div>
              </li>
            ) : (
              'Select User'
            )}
            {chatWith.chatID === this.state.activeChat
              ? writeMessage.length !== 0
                ? writeMessage.map(item => {
                    return (
                      <li key={item.id} className='clearfix'>
                        <div className='message-data align-right'>
                          <span className='message-data-time'>{item.date}</span>
                          <span className='message-data-name'>
                            {item.fromUser}
                          </span>
                          <i className='fa fa-circle me' />
                        </div>
                        <div className='message other-message float-right'>
                          {item.msg}
                        </div>
                      </li>
                    );
                  })
                : null
              : null}
          </ul>
        </div>

        <form onSubmit={this.formSubmit} className='chat-message clearfix'>
          <Input
            name='message-to-send'
            id='message-to-send'
            placeholder='Type your message'
            rows='3'
            value={this.state.text}
            onChange={this.handleTextAreaChange}
          />
          <button
            onClick={() => {
              postMessageToDB(this.state);
            }}
          >
            Send
          </button>
        </form>
      </div>
    );
  }
}
