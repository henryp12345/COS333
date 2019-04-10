import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { View, Text, Button } from 'native-base';
import GenerateForm from 'react-native-form-builder';

const styles = {
wrapper: {
flex: 1,
marginTop: 50,
},
submitButton: {
paddingHorizontal: 10,
paddingTop: 20,
},
name:{
    fontSize:22,
    color:"#000000",
    fontWeight:'600',
    padding:30
  },
};
// These Fields will create a login form with three fields
const fields = [
                {type: 'text',
                name: 'event',
                required: true,
                label: 'Name of Event',
                },
                {type: 'text',
                props: {multiline: true, secureTextEntry: true},
                name: 'description',
                required: true,
                label: 'Event Description',
                },
                {
                type: 'date',
                name: 'date',
                mode: 'datetime',
                minDate: 'Today',
                required: true,
                label: 'When is your event?',
                },
                {
                type: 'number',
                name: 'count',
                required: true,
                label: 'Num People',
                },
                {
                type: 'text',
                name: 'location',
                required: false,
                label: 'Location',
                },
                ];
export default class FormGenerator extends Component {
    login() {
        const formValues = this.formGenerator.getValues();
        console.log('FORM VALUES', formValues);
    }
    render() {
        return (
                <View style={styles.wrapper}>
                <Text style={styles.name}>Create Event</Text>
                <View>
                
                <GenerateForm
                ref={(c) => {
                this.formGenerator = c;
                }}
                fields={fields}
                />
                </View>
                <View style={styles.submitButton}>
                <Button block onPress={() => this.login()}>
                <Text>Submit</Text>
                </Button>
                </View>
                </View>
                );
    }
}

AppRegistry.registerComponent('FormGenerator', () => FormGenerator);

