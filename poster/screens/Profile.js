import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import Chatroom from './Chatroom';

class Profile extends React.Component {

  constructor(props) {
    super(props)
    const {navigation} = this.props;
    this.state = { hosted: [], joined: [], userId: 'Henry' }
  }
  
  componentDidMount() {
    fetch("https://posterapp333.herokuapp.com/hosted/" + this.state.userId + "/")
      .then(response => response.json())
      .then(responseJson => this.setState({hosted: responseJson}));
    fetch("https://posterapp333.herokuapp.com/joined/" + this.state.userId + "/")
      .then(response => response.json())
      .then(responseJson => this.setState({joined: responseJson}));
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
            <TouchableOpacity style={styles.textStyle}
              onPress={() => this.props.navigation.navigate("Room", {topic: "React Navigation", roomId: item.id.toString(10), userId: this.state.userId})}>
              <Icon name='comment'
                    type='font-awesome'
                    color='#00bfff'
                    size={30}/>
            </TouchableOpacity>
          </View>
          </Card>
        )}
        keyExtractor={(item, index) => index.toString()} />
      <Text style={{ fontFamily: 'Roboto', fontWeight: "bold", fontSize: 20}}>Events You Have Joined</Text>
      <FlatList
        data={this.state.joined}
        renderItem={({ item }) => (
          <Card>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.textStyle}>{item.title}</Text>
            <TouchableOpacity style={styles.textStyle}>
              <Icon name='comment'
                    type='font-awesome'
                    color='#00bfff'
                    size={30}/>
            </TouchableOpacity>
          </View>
          </Card>
        )}
        keyExtractor={(item, index) => index.toString()} />
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
  Home: {screen: Profile},
  Room: {screen: Chatroom},
});

export default createAppContainer(AppNavigator);

