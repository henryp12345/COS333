import React, {Component} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {ChatManager, TokenProvider} from '@pusher/chatkit-client';
import {Icon} from 'react-native-elements';
import {View, StyleSheet, Text, TouchableOpacity, KeyboardAvoidingView, Platform} from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';

export default class Chatroom extends Component {
  constructor(props) {
    super(props);
    this.state = {messages: [], userId: ''};
  }
  
  componentDidMount() {
    const {navigation} = this.props;
    this._isMounted = true;
    this.setState({userId: navigation.getParam('userId')});
    const manager = new ChatManager({
      instanceLocator: 'v1:us1:d8ae0067-3c87-4ca0-b2a0-5af6e602488e',
      userId: navigation.getParam('userId'),
      tokenProvider:new TokenProvider({url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/d8ae0067-3c87-4ca0-b2a0-5af6e602488e/token'}),
    });
    manager.connect()
      .then(currentUser => {
        this.currentUser = currentUser;
        this.currentUser.subscribeToRoom({
          roomId: navigation.getParam('roomId'),
          hooks: {onMessage: this.onReceive},
          messageLimit: 100,
        });
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
      },
    };
    if(this._isMounted) {
      this.setState(previousState => ({messages: GiftedChat.append(previousState.messages, incomingMessage)}));
    }
    else if (senderId != this.state.userId) {
      fetch("http://posterapp333/herokuapp.com/addMessage/" + userId + "/" + this.props.navigation.getParam('roomId'));
    }
  }
  
  onSend(messages = []) {
    const {navigation} = this.props;
        messages.forEach(message => {
          this.currentUser.sendMessage({
            text: message.text,
            roomId: navigation.getParam('roomId'),
          })
        });
  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }
  
  render() {
  const {navigation} = this.props;
    return(
    <View style={{flex: 1}}>
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: this.state.userId
        }}
      ></GiftedChat>
      {Platform.OS === 'android' ? <KeyboardSpacer topSpacing={-50}/> : null}
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
});
