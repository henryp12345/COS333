import React, { Component } from "react";
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import { ImageBackground, StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import { iOSUIKit } from 'react-native-typography'
import { Icon } from 'react-native-elements'
import { ChatManager, TokenProvider} from '@pusher/chatkit-client'

import bgEvent from '../images/event-wall.png';

export default class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { id: '',
                   title: '',
                   desc: '',
                   location: '',
                   startDate: new Date(),
                   startdate: '',
                   enddate: '',
                   endDate: new Date(),
                   capacity: 0,
                   numberJoined: 0,
                   tags: '',
                   host: '',
                   whichButton: 0,
                   chatroom: ''
    };
  }

  componentDidMount() {
  const { navigation } = this.props;
    fetch("https://posterapp333.herokuapp.com/event/" + navigation.getParam('eventId', -1) + "/")
      .then((response) => {
        var eventData = JSON.parse(response._bodyText)[0];
        var startDate = new Date(eventData.startdate);
        var endDate = new Date(eventData.enddate)
        this.setState({ id: eventData.id,
                        title: eventData.title,
                        desc: eventData.desc.substring(11,eventData.desc.length-2),
                        location: eventData.location,
                        startDate: startDate,
                        startdate: eventData.startDate,
                        enddate: eventData.endDate,
                        endDate: endDate,
                        capacity: eventData.capacity,
                        numberJoined: eventData.numberJoined,
                        tags: eventData.tags,
                        host: eventData.host,
                        chatroom: eventData.chatroom,
        });
      });
    const manager = new ChatManager({
        instanceLocator: 'v1:us1:d8ae0067-3c87-4ca0-b2a0-5af6e602488e',
        userId: this.props.screenProps.userId,
        tokenProvider:new TokenProvider({url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/d8ae0067-3c87-4ca0-b2a0-5af6e602488e/token'}),
    });
    manager.connect()
    .then(currentUser => {
      this.currentUser = currentUser;
    });
    fetch("https://posterapp333.herokuapp.com/getUser" + "/" + this.props.screenProps.userId + "/")
      .then((response) => {
        response.json()
          .then((responseJson) => {
            if (responseJson.joined.search(this.state.id) >= 0)
              this.setState({whichButton: 1})
            else if (responseJson.hosted.search(this.state.id) >= 0)
              this.setState({whichButton: 2})
          });
      });
  }
  
	render() {
    const { navigation } = this.props;
    // Put join button return stuff here
    if (this.state.whichButton == 0) {
      return (
        <ImageBackground style={styles.picture} source={bgEvent}>
        {this.props.children}
        <View style={styles.container}>
          <Text style={styles.welcome}> {this.state.title} </Text>
            <Text style={styles.date}> {this.state.startdate.substring(5,7)}{"/"}{this.state.startdate.substring(8,10)}
            {"  ║  ◷ "}{this.state.startdate.substring(11,16)}
            </Text>
            <Text style={styles.params1}>{"meet @ "} {this.state.location} </Text>
            <Text style={styles.params2}> {this.state.desc} </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Icon
                name='users'
                type='feather'
                color='#ffffff'
                size = {15}
                />
              <Text style={styles.params3}>
                {"  "}{this.state.numberJoined}{" of "}{this.state.capacity}{" attending"}
              </Text>
            </View>
            <TouchableOpacity style={styles.joinButton} onPress={() => {
              fetch("https://posterapp333.herokuapp.com/addJoined/" + navigation.getParam('userId') + "/" + navigation.getParam('eventId') + "/")
              .then((response) => {
                if (response._bodyText == 'Already joined') {
                    alert('You have already joined this event');
                    navigation.goBack();
                }
                else {
                  alert("Event joined");
                  navigation.goBack();
                }
              });
              }}>
        <Text style={styles.name}>join event</Text>
        </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.link}>Go Back</Text>
          </TouchableOpacity>
        </View>
        </ImageBackground>
      );
    }
    // Put leave button return stuff here
    if (this.state.whichButton == 1) {
      return (
        <ImageBackground style={styles.picture} source={bgEvent}>
        {this.props.children}
        <View style={styles.container}>
          <Text style={styles.welcome}> {this.state.title} </Text>
            <Text style={styles.date}> {this.state.startdate.substring(5,7)}{"/"}{this.state.startdate.substring(8,10)}
            {"  ║  ◷ "}{this.state.startdate.substring(11,16)}
            </Text>
            <Text style={styles.params1}>{"meet @ "} {this.state.location} </Text>
            <Text style={styles.params2}> {this.state.desc} </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Icon
                name='users'
                type='feather'
                color='#ffffff'
                size = {15}
                />
              <Text style={styles.params3}>
                {"  "}{this.state.numberJoined}{" of "}{this.state.capacity}{" attending"}
              </Text>
            </View>
            <TouchableOpacity style={styles.joinButton} onPress={() => {
              fetch("https://posterapp333.herokuapp.com/leave/" + navigation.getParam('userId') + "/" + navigation.getParam('eventId') + "/")
              .then(() => {
                alert("Event left");
                navigation.goBack();
              });
              this.currentUser.leaveRoom({roomId: this.state.chatroom});
            }}>
        <Text style={styles.name}>leave event</Text>
        </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.link}>Go Back</Text>
          </TouchableOpacity>
        </View>
        </ImageBackground>
      );
    }
    // Put delete button return stuff here
    else {
      return (
        <ImageBackground style={styles.picture} source={bgEvent}>
        {this.props.children}
        <View style={styles.container}>
          <Text style={styles.welcome}> {this.state.title} </Text>
            <Text style={styles.date}> {this.state.startdate.substring(5,7)}{"/"}{this.state.startdate.substring(8,10)}
            {"  ║  ◷ "}{this.state.startdate.substring(11,16)}
            </Text>
            <Text style={styles.params1}>{"meet @ "} {this.state.location} </Text>
            <Text style={styles.params2}> {this.state.desc} </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Icon
                name='users'
                type='feather'
                color='#ffffff'
                size = {15}
                />
              <Text style={styles.params3}>
                {"  "}{this.state.numberJoined}{" of "}{this.state.capacity}{" attending"}
              </Text>
            </View>
            <TouchableOpacity style={styles.joinButton} onPress={() => {
              fetch("https://posterapp333.herokuapp.com/delete/" + navigation.getParam('userId') + "/" + navigation.getParam('eventId') + "/")
              .then(() => {
                alert("Event deleted");
                navigation.goBack();
              });
              this.currentUser.deleteRoom({roomId: this.state.chatroom});
            }}>
        <Text style={styles.name}>cancel event</Text>
        </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.link}>Go Back</Text>
          </TouchableOpacity>
        </View>
        </ImageBackground>
      );
    }
	}
}

const styles = StyleSheet.create({
	container: {
		marginTop: 50,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	date: {
		...iOSUIKit.largeTitleEmphasizedObject,
		fontSize: 17,
		textAlign: "center",
		color: "#f5fffa",
		lineHeight: 17,
	},
	joinButton: {
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
	welcome: {
		...iOSUIKit.largeTitleEmphasizedObject,
		fontSize: 45,
    lineHeight:46,
		textAlign: "center",
		margin: 10,
		color: 'white',

	},
	params1: {
		...iOSUIKit.largeTitleEmphasizedObject,
		fontSize: 17,
		textAlign: "center",
    lineHeight:17,
		margin: 17,
		color: "#f5fffa",
	},
	params2: {
    ...iOSUIKit.largeTitleEmphasizedObject,
		textAlign: "center",
		fontSize: 15,
		margin: 10,
	},
  params3: {
    fontSize: 15,
    textAlign: "center",
    color: 'white',
  },
  link: {
		fontSize: 16,
		textAlign: "center",
		margin: 10
	},
   picture: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  name:{
    ...iOSUIKit.subheadEmphasizedObject,
    fontSize:15,
    fontWeight: 'bold',
    color: "white",
  },
  image: {
    width: 80,
    height: 120,
  },

});
