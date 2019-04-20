import React, { Component } from "react";
import { Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ChatStackNav from "../navigators/ChatStackNav";
import { NavigationActions } from "react-navigation";

export default class ChatHome extends Component {
  static router = ChatStackNav.router;

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Chat',
      headerLeft: null
    };
  };

  render() {
    return <ChatStackNav navigation={this.props.navigation} />;
  }
}
