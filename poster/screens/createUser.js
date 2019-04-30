import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import { TextInput, KeyboardAvoidingView, StyleSheet, ImageBackground, View, Text, Image, TouchableOpacity } from 'react-native';
import { NavigationActions } from "react-navigation";
import { iOSUIKit } from 'react-native-typography'
import GenerateForm from 'react-native-form-builder';
import { sha256 } from 'react-native-sha256';
import { Icon } from 'react-native-elements';

import bgSrc from '../images/wallpaper.jpg';
import logoImg from '../images/windows.png';

const fields = [
                {
                  type: 'text',
                  name: 'username',
                  required: true,
                  label: 'Username'
                },
                {
                  type: 'text',
                  props: {secureTextEntry: true},
                  name: 'password',
                  required: true,
                  label: 'Password',
                },
                {
                  type: 'text',
                  props: {secureTextEntry: true},
                  name: 'confirmPassword',
                  required: true,
                  label: 'Confirm password',
                },
];

export default class createUser extends Component {
  constructor(props) {
    super(props)
    this.state = {username: '', password: '', confirm: '', first: '', last: ''}
  }
  
  // Call this function when the create button is pressed
  createUser() {
    const {navigate} = this.props.navigation;
    if (this.state.password != this.state.confirm)
      alert("Passwords do not match.");
    else if (this.state.last.length == 0 || this.state.first.length == 0)
      alert("Please enter your name")
    else if (this.state.password.length < 6)
      alert("Password must be longer than 6 characters.");
    else {
      fetch("https://posterapp333.herokuapp.com/addUser/" + this.state.username + "/" + this.state.password + "/" + this.state.first + "/" + this.state.last + "/")
        .then((response) => {
          if (response._bodyText == "OK") {
            alert('Thanks for joining Poster!');
            navigate("Dashboard", {userId: this.state.username});
          }
          else
            alert('Username already taken.');
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
        <Text style={styles.title}>REGISTER</Text>
        <KeyboardAvoidingView
          behavior='padding'
          keyboardVerticalOffset = {135}
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
        name='edit-3'
        type='feather'
        color='#b0b7c1'
        size = {14}
        />
          <TextInput style={{paddingLeft:10}}
              placeholder="First Name"
              autoCapitalize="none"
              placeholderTextColor="#b0b7c1"
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({first: text})}
              />
            </View>

        <View style={styles.inputContainer}>
        <Icon
        name='edit-3'
        type='feather'
        color='#b0b7c1'
        size = {14}
        />
          <TextInput style={{paddingLeft:10}}
              placeholder="Last Name"
              autoCapitalize="none"
              placeholderTextColor="#b0b7c1"
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({last: text})}
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
              autoCapitalize="none"
              secureTextEntry={true}
              placeholderTextColor="#b0b7c1"
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({password: text})}/>
            </View>

        <View style={styles.inputContainer}>
        <Icon
        name='lock'
        type='feather'
        color='#b0b7c1'
        size = {14}
        />
          <TextInput style={{paddingLeft:10}}
              placeholder="Confirm Password"
              autoCapitalize="none"
              secureTextEntry={true}
              placeholderTextColor="#b0b7c1"
              underlineColorAndroid='transparent'
              onChangeText={(text) => this.setState({confirm: text})}/>
            </View>
        </KeyboardAvoidingView>

     <TouchableOpacity style={styles.container2} onPress={() => this.createUser()}>
      <Text style={styles.name}>SIGN UP</Text>
      </TouchableOpacity>
           <TouchableOpacity onPress={() => navigate('Login')}>
        <Text style={styles.text}>Have an account? Log In</Text>
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
  ...iOSUIKit.largeTitleEmphasizedObject,
    color: 'black',
    backgroundColor: 'transparent',
    marginTop: 20,
    fontSize: 25,
    marginBottom: 40,
  },

  name:{
    ...iOSUIKit.subheadEmphasizedObject,
    fontSize:15,
    fontWeight: 'bold',
    color: 'white',
  }
});
