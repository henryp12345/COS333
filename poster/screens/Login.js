import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet, ImageBackground, View, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationActions } from "react-navigation";
import { iOSUIKit } from 'react-native-typography'

import bgSrc from '../images/wallpaper.jpg';
import logoImg from '../images/windows.png';

export default class Login extends Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <ImageBackground style={styles.picture} source={bgSrc}>
        {this.props.children}
        <View style={styles.container}>
        <Image source={logoImg} style={styles.image} />
        <Text style={styles.title}>p o s t e r</Text>
        <TouchableOpacity style={styles.container2} onPress={() => navigate("Dashboard")}>
      <Text style={styles.name}>LOG IN</Text>
      </TouchableOpacity> 
        </View>
        </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  container2: {
    marginTop:100,
    height:40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    marginBottom:20,
    width:200,
    borderRadius:20,
    backgroundColor: "#e0ffff",
  },
  picture: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  container: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 80,
    height: 80,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginTop: 20,
    fontSize:20
  },
  title: {
    ...iOSUIKit.subheadEmphasizedObject,
    color: 'black',
    backgroundColor: 'transparent',
    marginTop: 20,
    fontSize:25,
  },
  name:{
    ...iOSUIKit.subheadEmphasizedObject,
    fontSize:15,
    fontWeight: 'bold',
    color: "#171F33",
  }
});
