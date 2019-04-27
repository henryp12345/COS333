import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import { TextInput, KeyboardAvoidingView, StyleSheet, ImageBackground, View, Text, Image, TouchableOpacity } from 'react-native';
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
       
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Email"
              keyboardType="email-address"
              underlineColorAndroid='transparent'/>
        </View>
        <View style={styles.inputContainer}>
          <TextInput style={styles.inputs}
              placeholder="Password"
              secureTextEntry={true}
              underlineColorAndroid='transparent'/>
        </View>

     <TouchableOpacity style={styles.container2} onPress={() => navigate("Dashboard", {userId: 'Henry'})}>
      <Text style={styles.name}>LOG IN</Text>
      </TouchableOpacity> 
           <TouchableOpacity onPress={() => navigate("createUser")}>
        <Text>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
        </View>
        </ImageBackground>

    );
  }
}

const styles = StyleSheet.create({
  inputContainer: {
    height:40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    marginBottom:10,
    width:250,
    borderRadius:20,
    backgroundColor: "#ffffff",
    borderColor: '#ff1493',
    borderWidth: 0.5
  },
  inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
      flex:1,
  },
 
  container2: {
    height:40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:'center',
    marginBottom:20,
    width:250,
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
    marginBottom: 40,
  },
  name:{
    ...iOSUIKit.subheadEmphasizedObject,
    fontSize:15,
    fontWeight: 'bold',
    color: 'white',
  }
});
