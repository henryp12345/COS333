import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

export default class Profile extends Component {

  render() {
    return (
      <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.headerContent}>

                <Image style={styles.avatar}
                  source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/>

                <Text style={styles.name}>Henry Peters</Text>
                <Text style={styles.userInfo}>henry@princeton.edu </Text>
                <Text style={styles.userInfo}>2020</Text>
                </View>
                </View>
                <View style={styles.body}>
            <View style={styles.bodyContent}>
            <Text style={styles.name}>Your Events</Text>
            <Text style={styles.userInfo}>Event 1 </Text>
            <Text style={styles.userInfo}>Event 2 </Text>
            <Text style={styles.userInfo}>Event 3 </Text>
            </View>
          </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: "#ffffff",
    marginTop:60
  },
  headerContent:{
    padding:30,
    alignItems: 'center',
  },
  body:{
    marginTop:1,
  },
  bodyContent: {
    alignItems: 'flex-start',
    padding:30,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
  },
  name:{
    fontSize:22,
    color:"#000000",
    fontWeight:'600',
  },
  userInfo:{
    fontSize:16,
    color:"#778899",
    fontWeight:'600',
  }
});