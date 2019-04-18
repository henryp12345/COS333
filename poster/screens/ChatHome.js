import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { Card } from 'react-native-elements'
import Chatkit from '@pusher/chatkit-server';

export default class Profile extends React.Component {

  const Chatkit = require('@pusher/chatkit-server');
  
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  componentWillMount() {
    const {navigation} = this.props;
    const chatkit = new Chatkit.default({
      instanceLocator: 'v1:us1:d8ae0067-3c87-4ca0-b2a0-5af6e602488e',
      key: '2ff7c102-14e2-4dd6-9414-bfa3f5c66e41:ZiwVYEh7mWf5zmxuZHKq1jyQ7bO5Z5iGSHyg4SDBDUQ=',
    });
    var currentUser = chatkit.getUser({id: navigation.getParam('userId')});
  }

  render() {
    return (
      //ListView to show with textinput used as search bar
      <View style={styles.viewStyle}>
      <Text style={{ fontFamily: 'Roboto', fontWeight: "bold", fontSize: 24}}>Welcome back, Henry.</Text>

      <Text style={{ fontFamily: 'Roboto', fontWeight: "bold", fontSize: 20}}>Events You are Hosting</Text>
      <Card><Text>Event 1</Text></Card>
      <Card><Text>Event 2</Text></Card>
      <Card><Text>Event 3</Text></Card>
      <Text style={{ fontFamily: 'Roboto', fontWeight: "bold", fontSize: 20}}>Events You Have Joined</Text>
      <Card><Text>Event 4</Text></Card>
      <Card><Text>Event 5</Text></Card>
      <Card><Text>Event 6</Text></Card>
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


