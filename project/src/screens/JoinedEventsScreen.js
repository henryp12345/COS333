import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class JoinedEventsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>List of events user has joined</Text>
      </View>
    );
  }
}