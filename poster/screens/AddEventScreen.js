import React, { Component } from 'react';
import { KeyboardAvoidingView, Platform, ImageBackground, AppRegistry, Image, StyleSheet, Alert, ScrollView } from 'react-native';
import { View, Text, Button, Fonts } from 'native-base';
import GenerateForm from 'react-native-form-builder';
import { TagSelect } from 'react-native-tag-select';
import { iOSUIKit } from 'react-native-typography'
import { ChatManager, TokenProvider } from '@pusher/chatkit-client';
import { Constants, AppLoading } from 'expo';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import bgForm from '../images/wallpaper.jpg';

// These Fields will create a login form with three fields
const fields = [
                {
                	type: 'text',
                	name: 'event',
                	required: true,
                	label: '(e.g. bball, split uber, etc) - 15 chars max',
                },
                {
                	type: 'group',
                  name: 'description',
                  label: 'Event Summary:',
                  required: false,
                  multiline: true, 
                  fields: [
                  {
                    type: 'text',
                    name: 'deets',
                    label: '(optional)',
                  },
                  ]
            	  },
                {
                	type: 'date',
                	name: 'startdate',
                	mode: 'datetime',
                	minDate: 'Today',
                	required: true,
                	label: 'When does your event start?',
                },
                {
                	type: 'date',
                	name: 'enddate',
                	mode: 'datetime',
                	minDate: 'Today',
                	required: true,
                	label: 'When does your event end?',
                },
                {
                	type: 'number',
                	name: 'count',
                	required: true,
                	label: 'How many people do you need?',
                },
                {
                	type: 'text',
                	name: 'location',
                	required: false,
                	label: 'Where will this be held?',
                },
                ];

export default class FormGenerator extends Component {
	constructor(props) {
    	super(props);
    	const {navigation} = this.props;
      	this.state = {loading: true, userId: this.props.screenProps.userId};
    }
  
  	async componentWillMount() {
    	await Expo.Font.loadAsync({
      		Roboto: require("native-base/Fonts/Roboto.ttf"),
      		Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      		Ionicons: require("@expo/vector-icons/fonts/Ionicons.ttf"),
    	});
    	this.setState({ loading: false });
  	}

    login(items) {
      
        const formValues = this.formGenerator.getValues();
        var chatId;
        const manager = new ChatManager({
          instanceLocator: 'v1:us1:d8ae0067-3c87-4ca0-b2a0-5af6e602488e',
          userId: this.state.userId,
          tokenProvider: new TokenProvider({url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/d8ae0067-3c87-4ca0-b2a0-5af6e602488e/token'}),
        });
        manager.connect()
        .then(currentUser => {
          currentUser.createRoom({name: formValues.event})
          .then(room => {
            chatId = room.id;
            var tags = "";
            for (i = 0; i < items.length; i++)
                tags = tags + items[i] + ",";
            fetch("https://posterapp333.herokuapp.com/events/" + this.state.userId + "/", {
                  method: 'POST',
                  headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                       title: formValues.event,
                       desc: formValues.description,
                       startdate: formValues.startdate,
                       enddate: formValues.enddate,
                       capacity: formValues.count,
                       location: formValues.location,
                       tags: tags,
                       host: this.state.userId,
                       chatId: chatId,
                  }),
            })
            .then(response => Alert.alert("Success! You have posted your event."))
            console.log('FORM VALUES', formValues);
            this.formGenerator.resetForm();
          });
        });
      this.props.navigation.navigate("HomeScreen")
    }
  
    render() {
    	if (this.state.loading) {
      		return <Expo.AppLoading />;
    	}

        const arrayOfString = ['Sports', 'Study', 'Gaming', 'Shopping', 'Transport', 'Campus Activity', 'Project', 'Other']

        return (
          <ImageBackground style={styles.picture} source={bgForm}>
          <View style={styles.viewStyle}>
            <Text style={styles.customTitle}>Create Event</Text>
        		<KeyboardAvoidingView style={styles.container} behavior="padding">
                <ScrollView style={styles.wrapper}>
                <View>
                <Text style={styles.labelEvent}> What is your event? </Text>
                <GenerateForm style={styles.submit}
                ref={(c) => {
                this.formGenerator = c;
                }}
                fields={fields}
                />
                <Text style={styles.labelTextb}>What kind of event is this?</Text>
        <View style={styles.container}>
        <TagSelect
          data={arrayOfString}
          ref={(tag) => {
            this.tag = tag;
          }}
          itemStyle={styles.item}
          itemLabelStyle={styles.label}
        />
        </View>
                </View>
                <View style={styles.submitButton}>
                <Button block onPress={() => this.login(this.tag.itemsSelected)}>
                <Text style={styles.submit}>SUBMIT</Text>
                </Button>
                </View>
                
                </ScrollView>
                </KeyboardAvoidingView>
                </View>
                </ImageBackground>
                );
    }
}

const styles = StyleSheet.create({
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    margin: 20,
    margin: 15,
    textAlign: 'center',
    marginTop: Constants.statusBarHeight + 10
  },
	container: {
		marginTop: 50,
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
  customTitle: {
  ...iOSUIKit.largeTitleEmphasizedObject,
  fontSize: 28,
  },
	date: {
		...iOSUIKit.largeTitleEmphasizedObject,
		fontSize: 17,
		textAlign: "center",
		color: "#f5fffa",
		lineHeight: 17,
	},
	welcome: {
		...iOSUIKit.largeTitleEmphasizedObject,
		fontSize: 45,
    	lineHeight:46,
		textAlign: "center",
		margin: 10,
		color: 'white',
	},
   picture: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  image: {
    width: 80,
    height: 120,
  },
  wrapper: {
	flex: 1,
	marginTop: 35,
  },
  submitButton: {
	paddingHorizontal: 90,
	paddingTop: 15,
	padding:10,
  },
  submit: {
  	...iOSUIKit.subheadEmphasizedObject,
  	color: 'white',
  },
  name:{
	...iOSUIKit.largeTitleEmphasizedObject,
    fontSize: 28,
    color:'black',
    padding:20
  },
  labelText:{
  	...iOSUIKit.subheadEmphasizedObject,
  	fontSize: 17,
    padding:10,
    color: 'white',
  },
  labelTextb:{
  	...iOSUIKit.subheadEmphasizedObject,
  	fontSize: 17,
    padding: 0,
    paddingVertical: 15,
    color: 'black',
  },
  labelEvent:{
    ...iOSUIKit.subheadEmphasizedObject,
    fontSize: 22,
    padding:0,
    color: 'black',
  },
  item: {
    borderWidth: 1,   
    backgroundColor: '#FFF',
  },
  label: {
    color: '#333',
    fontSize: 15,
  },
  container: {
  	flex: 1,
  	marginLeft: 15,
  }
});

AppRegistry.registerComponent('FormGenerator', () => FormGenerator);
