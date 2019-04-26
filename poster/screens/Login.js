import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet, ImageBackground, View, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationActions } from "react-navigation";
import { iOSUIKit } from 'react-native-typography'
import GenerateForm from 'react-native-form-builder';
import { sha256 } from 'react-native-sha256';

import bgSrc from '../images/wallpaper.jpg';
import logoImg from '../images/windows.png';

const fields = [
                 {
                   type: 'text',
                   name: 'username',
                   required: true,
                   label: 'Username',
                 },
                 {
                   type: 'text',
                   props: {secureTextEntry: true},
                   name: 'password',
                   required: true,
                   label: 'Password',
                 },
               ];

export default class Login extends Component {
  login() {
    const { navigate } = this.props.navigation;
    const formValues = this.formGenerator.getValues();
    sha256(formValues.password)
      .then((hash) => {
        fetch("https://posterapp333.herokuapp.com/authUser/" + formValues.username + "/" + hash + "/")
          .then((response) => {
            if (response == 'OK') {
              navigate("Dashboard", {userId: formValues.username});
            }
            else
              alert("Invalid username or password");
          });
      });
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ImageBackground style={styles.picture} source={bgSrc}>
        {this.props.children}
        <View style={styles.container}>
        <Image source={logoImg} style={styles.image} />
        <Text style={styles.title}>p o s t e r</Text>
        <TouchableOpacity style={styles.container2} onPress={() => navigate("Dashboard", {userId: 'Henry'})}>
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
    backgroundColor: "#ff1493",
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
    height: 120,
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
    color: 'white',
  }
});
