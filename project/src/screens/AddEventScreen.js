import React, { Component } from 'react';
import { Text, View } from 'react-native';

export default class AddEventScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Add a new event</Text>
      </View>
    );
  }
}