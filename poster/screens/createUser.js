import React, { Component } from 'react';
import sha256 from 'react-native-sha256';

const fields [
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
  
  // Call this function when the create button is pressed
  createUser() {
    const formValues = this.formGenerator.getValues();
    const {navigate} = this.props.navigation;
    if (formValues.password != formValues.confirmPassword)
      alert("Passwords do not match");
    else if (formValues.password.length < 6)
      alert("Password must be longer than 6 characters");
    else {
      sha256(formValues.password)
        .then((hash) => {
          fetch("https://posterapp333.herokuapp.com/addUser/" + formValues.username + "/" + hash + "/")
            .then((response) => {
              if (response._bodyText == "OK") {
                alert('Thanks for joining Poster!');
                navigate("Dashboard", {userId: formValues.username});
              }
              else
                alert('Username already taken');
            });
        });
    }
  }

  render() {
    return();
  }
}
