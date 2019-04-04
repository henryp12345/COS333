import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class DiscoverScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Suggested events for the user</Text>
      </View>
    );
  }
}