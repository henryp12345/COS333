import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { NavigationActions } from "react-navigation";

export default class Login extends Component {
  render() {
  	const { navigate } = this.props.navigation;
   return (
   	<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
     <Text>Insert Poster logo</Text>
      
      <TouchableOpacity style={styles.container} onPress={() => navigate("Dashboard")}>
      <Text style={styles.name}>Log In</Text>
      </TouchableOpacity> 
      </View>        
   )
  }
}

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
