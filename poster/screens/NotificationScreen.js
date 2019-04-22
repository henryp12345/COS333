import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import { SearchBar, Button, Icon } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { iOSUIKit } from 'react-native-typography';

export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    const {navigation} = this.props;
    this.state = {messageString: [], notifications: [], userId: 'Henry'/*navigation.getParam('userId')*/};
  }
  
  componentDidMount() {
   fetch("https://posterapp333.herokuapp.com/notifications/" + this.state.userId + "/")
    .then((response) => response.json())
      .then((responseJson) => this.setState({notifications: responseJson}));
   fetch("https://posterapp333.herokuapp.com/newMessages/" + this.state.userId + "/")
    .then((response) => response.json())
      .then((responseJson) => this.setState({messageString: responseJson}));
  }

  render() {
    return (
      <View style={styles.viewStyle}>
      <Text style={styles.customTitle}>Notifications</Text>
      <Text style={styles.customTitle}>More people have joined these events</Text>
      <FlatList data={this.state.notifications} />
      <Text style={styles.customTitle}>You have new messages in these chats</Text>
      <FlatList data={this.state.newMessages} />
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
    padding: 10,
    alignItems: 'flex-start',
    padding:30,
  },

});
