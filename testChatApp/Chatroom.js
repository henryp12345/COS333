import React from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {ChatManager, TokenProvider} from '@pusher/chatkit-client';

export default class Chatroom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {messages: [], userId: ''};
  }
  
  componentWillMount() {
    const {navigation} = this.props;
    this.setState({userId: navigation.getParam('userId')});
    const manager = new ChatManager({
      instanceLocator: 'v1:us1:d8ae0067-3c87-4ca0-b2a0-5af6e602488e',
      userId: navigation.getParam('userId'),
      tokenProvider:new TokenProvider({url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/d8ae0067-3c87-4ca0-b2a0-5af6e602488e/token'}),
    });
    manager.connect()
      .then(currentUser => {
        currentUser.fetchMultipartMessages({roomId: navigation.getParam('roomId')})
          .then(oldMessages => {
            var temp = [];
            for(i = 0; i < oldMessages.length; i++) {
              temp.push({
                _id: i,
                text: oldMessages.reverse()[i].parts[0].payload.content,
                createdAt: oldMessages.reverse()[i].createdAt,
                user: {_id:oldMessages.reverse()[i].senderId, name:oldMessages.reverse()[i].senderId}
              });
            }
            this.setState({messages: temp});
          });
      });
  }
  
  onSend(messages = []) {
    const {navigation} = this.props;
    const manager = new ChatManager({
      instanceLocator: 'v1:us1:d8ae0067-3c87-4ca0-b2a0-5af6e602488e',
      userId: navigation.getParam('userId'),
      tokenProvider:new TokenProvider({url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/d8ae0067-3c87-4ca0-b2a0-5af6e602488e/token'}),
    });
    manager.connect()
      .then(currentUser => {
        messages.forEach(message => {
          currentUser.sendMessage({
            text: message.text,
            roomId: navigation.getParam('roomId'),
          })
        });
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages)
        }));
      });
  }
  
  render() {
    return(
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.state.userId
        }}
      />
    );
  }
}
