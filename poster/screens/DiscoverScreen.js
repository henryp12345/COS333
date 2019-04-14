import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default class DiscoverScreen extends Component {
  render() {
    return (
      <View style={styles.viewStyle}>
      <Text style={{ fontFamily: 'Avenir', fontWeight: "bold", fontSize: 24}}>Discover</Text>      
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