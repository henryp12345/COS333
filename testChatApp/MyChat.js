import React from "react";
import {View, KeyboardAvoidingView} from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';

    const CHATKIT_TOKEN_PROVIDER_ENDPOINT = 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/741c30a0-4302-4476-bae4-75ac6c1744ba/token';
    const CHATKIT_INSTANCE_LOCATOR = 'v1:us1:741c30a0-4302-4476-bae4-75ac6c1744ba';
    const CHATKIT_ROOM_ID = '19427112';
    const CHATKIT_USER_NAME = 'Mensheng';

export default class MyChat extends React.Component {
  state = {
    messages: []
  };

  componentDidMount() {
      const tokenProvider = new TokenProvider({
        url: CHATKIT_TOKEN_PROVIDER_ENDPOINT,
      });

      const chatManager = new ChatManager({
        instanceLocator: CHATKIT_INSTANCE_LOCATOR,
        userId: CHATKIT_USER_NAME,
        tokenProvider: tokenProvider,
      });

      chatManager
        .connect()
        .then(currentUser => {
          this.currentUser = currentUser;
          this.currentUser.subscribeToRoom({
            roomId: CHATKIT_ROOM_ID,
            hooks: {
              onMessage: this.onReceive,
            },
          });
        })
        .catch(err => {
          console.log(err);
        });
    }

  onReceive = data => {
      const { id, senderId, text, createdAt } = data;
      const incomingMessage = {
        _id: id,
        text: text,
        createdAt: new Date(createdAt),
        user: {
          _id: senderId,
          name: senderId,
          avatar:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmXGGuS_PrRhQt73sGzdZvnkQrPXvtA-9cjcPxJLhLo8rW-sVA',
        },
      };

      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, incomingMessage),
      }));
    };
  
  
  onSend = (messages = []) => {
    messages.forEach(message => {
      this.currentUser
        .sendMessage({
          text: message.text,
          roomId: CHATKIT_ROOM_ID,
        })
        .then(() => {})
        .catch(err => {
          console.log(err);
        });
    });
  };
  
  
  render() {
    return (
      <View style={{ flex:1 }}>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          user={{
            _id: CHATKIT_USER_NAME
          }}
        />
        <KeyboardAvoidingView
          behavior={'padding'}
        />
      </View>
    );
  }
}
