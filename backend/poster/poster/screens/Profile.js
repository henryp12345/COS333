import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import { Card } from 'react-native-elements'

export default class Profile extends React.Component {
  
  render() {
    return (
      //ListView to show with textinput used as search bar
      <View style={styles.viewStyle}>
      <Text style={{ fontFamily: 'Avenir', fontWeight: "bold", fontSize: 24}}>Welcome back, Henry.</Text>

      <Text style={{ fontFamily: 'Avenir', fontWeight: "bold", fontSize: 20}}>Your Current Events</Text>
      <Card><Text>Event 1</Text></Card>
      <Card><Text>Event 2</Text></Card>
      <Card><Text>Event 3</Text></Card>
      <Text style={{ fontFamily: 'Avenir', fontWeight: "bold", fontSize: 20}}>Your Past Events</Text>
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

