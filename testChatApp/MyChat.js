import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Card } from 'react-native-elements'
import {ChatManager, TokenProvider} from '@pusher/chatkit-client';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import Chatroom from './Chatroom';

class MyChat extends React.Component {
  
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {rooms : [], userId: 'Henry' /* or navigation.getParam('userId')*/}
  }
  
  componentDidUpdate() {
    const {navigation} = this.props;
    const manager = new ChatManager({
      instanceLocator: 'v1:us1:d8ae0067-3c87-4ca0-b2a0-5af6e602488e',
      userId: 'Henry' /* or navigation.getParam('userId')*/,
      tokenProvider: new TokenProvider({url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/d8ae0067-3c87-4ca0-b2a0-5af6e602488e/token'}),
    });
    manager.connect()
      .then(currentUser => {this.setState({rooms: currentUser.rooms})});
  }

  render() {
    return (
      //ListView to show with textinput used as search bar
      <View style={styles.viewStyle}>
      <Text style={{ fontFamily: 'Roboto', fontWeight: "bold", fontSize: 24}}>Welcome back, Henry.</Text>
      <Text style={{ fontFamily: 'Roboto', fontWeight: "bold", fontSize: 20}}>Here are your chats</Text>
      <FlatList
          data={this.state.rooms}
          renderItem={({ item }) => (
          <Card>
          <Text style={styles.textStyle}>{item.name}</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Room", { topic: "React Navigation" , roomId: item.id, userId: this.state.userId})}>
          <Text style={styles.textStyle}>Go to event details page</Text>
        </TouchableOpacity>
            </Card>
          )}
          enableEmptySections={true}
          style={{ marginTop: 10 }}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    backgroundColor: 'white',
    margin: 20,
    margin: 15,
    textAlign: 'center',
 
  },

  textStyle: {
    padding: 10,
    alignItems: 'flex-start',
    padding:30,
  },

});

const AppNavigator = createStackNavigator({
  Home: {screen: MyChat},
  Room: {screen: Chatroom},
});

export default createAppContainer(AppNavigator);

