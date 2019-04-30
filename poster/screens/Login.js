import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import { TextInput, KeyboardAvoidingView, StyleSheet, ImageBackground, View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { NavigationActions } from "react-navigation";
import { iOSUIKit } from 'react-native-typography'
import GenerateForm from 'react-native-form-builder';
import CryptoJS from 'react-native-crypto-js';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import bgSrc from '../images/wallpaper.jpg';
import logoImg from '../images/windows.png';
import { Icon } from 'react-native-elements';

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
  constructor(props) {
    super(props);
    this.state = {username: '', password: ''};
  }

  login() {
    const { navigate } = this.props.navigation;
    if (this.state.username.length == 0 || this.state.password.length == 0)
      alert("Please enter a username and password.");
    else {
      fetch("https://posterapp333.herokuapp.com/authUser/" + this.state.username + "/" + this.state.password + "/")
        .then((response) => {
          if (response._bodyText == 'OK') {
            var userId = this.state.username;
            this.setState({username: '', password: ''});
            navigate("Dashboard", {userId: userId});
          }
          else
            alert("The username or password is incorrect. Try again.");
      });
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <ImageBackground style={styles.picture} source={bgSrc}>
        {this.props.children}
        <View style={styles.container}>
        <Image source={logoImg} style={styles.image} />
        <Text style={styles.title}>p o s t e r</Text>
        <KeyboardAvoidingView
          behavior = 'padding'
          keyboardVerticalOffset= {50}
        >
        <View style={styles.inputContainer}>
        <Icon
   name='user'
   type='feather'
   color='#b0b7c1'
   size = {14}
   />
          <TextInput style={{paddingLeft:10}}
              placeholder="Username"
              autoCapitalize="none"
              placeholderTextColor="#b0b7c1"
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({username: text})}
              />
              </View>

        <View style={styles.inputContainer}>
        <Icon
   name='lock'
   type='feather'
   color='#b0b7c1'
   size = {14}
   />
          <TextInput style={{paddingLeft:10}}
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
              placeholderTextColor="#b0b7c1"
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({password: text})}
              />
              </View>
        </KeyboardAvoidingView>

     <TouchableOpacity style={styles.container2} onPress={() => this.login()}>
      <Text style={styles.name}>LOG IN</Text>
      </TouchableOpacity>
       <TouchableOpacity onPress={() => navigate("createUser")}>
        <Text style={styles.text}>Don't have an account? Sign Up</Text>
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
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf:'center',
    textAlign: 'center',
    marginBottom:10,
    paddingLeft: 20,
    width:250,
    borderRadius:30,
    backgroundColor: "#ffffff",
    borderColor: '#ff1493',
    borderWidth: 0.5,
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
    color: '#6495ed',
    fontWeight: 'normal',
    backgroundColor: 'transparent',
    fontSize:15
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
