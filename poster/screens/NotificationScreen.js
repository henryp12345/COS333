import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import { SearchBar, Button, Icon, Card } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { iOSUIKit } from 'react-native-typography';

export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {messages: [], notifications: [], userId: 'Henry'/*navigation.getParam('userId')*/};
  }
  
  componentDidMount() {
   fetch("https://posterapp333.herokuapp.com/notifications/" + this.state.userId + "/")
    .then((response) => response.json())
      .then((responseJson) => this.setState({notifications: responseJson}));
   fetch("https://posterapp333.herokuapp.com/newMessages/" + this.state.userId + "/")
    .then((response) => response.json())
      .then((responseJson) => this.setState({messages: responseJson}));
  }

renderSeparator = () => (
    <View
      style={{
        backgroundColor: 'black',
        height: 0.5,
      }}
    />
  );

  render() {
    return (
      <View style={styles.viewStyle}>
      <Text style={styles.customTitle}>Notifications</Text>
      <FlatList
        data={this.state.notifications}
        ItemSeparatorComponent={this.renderSeparator}
        renderItem={({ item }) => (
            <Text style={styles.textStyle}>A new user has joined {item.title}</Text>
        )}
        keyExtractor={(item, index) => index.toString()} />

            <FlatList
        data={this.state.newMessages}
        ItemSeparatorComponent={this.renderSeparator}
        renderItem={({ item }) => (
            <Text style={styles.textStyle}>You have a new message in the {item.title} chat</Text>
        )}
        keyExtractor={(item, index) => index.toString()} />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  customTitle: {
  ...iOSUIKit.largeTitleEmphasizedObject,
  fontSize: 28,
},

  viewStyle: {
    flex: 1,
    backgroundColor: 'white',
    margin: 20,
    margin: 15,
    textAlign: 'center',
 
  },

  textStyle: {
    padding: 20,
    alignItems: 'flex-start',
  },

});
