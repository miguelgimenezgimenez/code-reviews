import { MessageEncrypted } from './MessageEncrypted';
import { MessageInputEncrypted } from "./MessageInputEncrypted";
import React from 'react';
import { StartChat } from "./StartChat";
import { Channel, ChannelHeader, Chat, MessageList, Thread, Window, Avatar } from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';
import './index.css';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sender: null,
      receiver: null,
      stream: null,
      virgil: null
    };
  }

  _buildMessageEncrypted = (props) => {
    const newProps = {
      ...props,
      sender: this.state.sender,
      receiver: this.state.receiver,
      virgil: this.state.virgil
    };
    return <MessageEncrypted {...newProps}/>
  };

  onConnect = (chatData) => {
    this.setState(chatData);
  };

  render = () => {
    if (this.state.stream && this.state.virgil) {
      return (
        <Chat client={this.state.stream.client} theme={'team dark'}>
          <Channel channel={this.state.stream.channel}>
            <Window>
              <ChannelHeader/>
              <MessageList Message={this._buildMessageEncrypted}/>
              <MessageInputEncrypted virgil={this.state.virgil} channel={this.state.stream.channel}/>
            </Window>
            <Thread/>
          </Channel>
        </Chat>
      )
    } else {
      return <StartChat onConnect={this.onConnect}/>
    }
  }
}

export default App;
