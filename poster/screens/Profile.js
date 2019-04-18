import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Card } from 'react-native-elements';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';

export default class Profile extends React.Component {

  constructor(props) {
    super(props)
    const {navigation} = this.props;
    this.state = { hosted: [], joined: [], userId: 'Henry' }
  }
  
  componentDidMount() {
    fetch("https://posterapp333.herokuapp.com/hosted/" + this.state.userId + "/")
      .then((response) => alert(response._bodyText));
    fetch("https://posterapp333.herokuapp.com/joined/" + this.state.userId + "/");
  }
  
  componentDidUpdate() {
    
  }
  
  render() {
    return (
      //ListView to show with textinput used as search bar
      <View style={styles.viewStyle}>
      <Text style={{ fontFamily: 'Roboto', fontWeight: "bold", fontSize: 24}}>Welcome back, Henry.</Text>

      <Text style={{ fontFamily: 'Roboto', fontWeight: "bold", fontSize: 20}}>Events You are Hosting</Text>
      <FlatList
        data={this.state.hosted}
        renderItem={({ item }) => (
          <Card>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.textStyle}>{item.title}</Text>
            <TouchableOpacity style={styles.button}></TouchableOpacity>
          </View>
          </Card>
        )} />
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

  button: {
      alignItems: 'flex-end',
      height: 20,
      width: 20,
      borderRadius: 20,
    },
});

