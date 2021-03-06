import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-elements';

const styles = StyleSheet.create({
   container: {
    marginTop:100,
    height:45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    marginBottom:20,
    width:300,
    borderRadius:30,
    backgroundColor: "#171F33",
  },
  button: {
  	backgroundColor: "#171F33"
  },
  name:{
    fontSize:13,
    color: "#ffffff",
  }
})

export default class JoinedEventsScreen extends Component {
  render() {
   return (
   	<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Poster is designed to help you find other Princeton students looking to participate in your intended group activity. </Text>
    
              </View>        
   )
  }
}