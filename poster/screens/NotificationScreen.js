import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import { SearchBar, Button, Icon } from 'react-native-elements';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { iOSUIKit } from 'react-native-typography'

export default class NotificationScreen extends Component {
  render() {
    return (
      <View style={styles.viewStyle}>
      <Text style={styles.customTitle}>Notifications</Text>  
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