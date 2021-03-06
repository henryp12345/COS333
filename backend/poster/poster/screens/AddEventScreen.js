import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Alert, ScrollView } from 'react-native';
import { View, Text, Button } from 'native-base';
import GenerateForm from 'react-native-form-builder';
import { TagSelect } from 'react-native-tag-select';

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
    padding:20
  },
};
// These Fields will create a login form with three fields
const fields = [
                {type: 'text',
                name: 'event',
                required: true,
                label: 'What is your event?',
                },
                {type: 'text',
                props: {multiline: true, secureTextEntry: true},
                name: 'description',
                required: true,
                label: 'Describe your event',
                },
                {
                type: 'date',
                name: 'startdate',
                mode: 'datetime',
                minDate: 'Today',
                required: true,
                label: 'When is the event starting?',
                },
                {
                type: 'date',
                name: 'enddate',
                mode: 'datetime',
                minDate: 'Today',
                required: true,
                label: 'When does the event end?',
                },
                {
                type: 'number',
                name: 'count',
                required: true,
                label: 'How many people are you looking for?',
                },

                {
                type: 'text',
                name: 'location',
                required: false,
                label: 'Where will this be held?',
                },
                ];
export default class FormGenerator extends Component {
    login(items) {
        const formValues = this.formGenerator.getValues();
        var tags = "";
        for (i = 0; i < items.length; i++)
            tags = tags + items[i] + ",";
        fetch("https://posterapp333.herokuapp.com/event/", {
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
              }),
        })
        console.log('FORM VALUES', formValues);
    }
    render() {
        const arrayOfString = ['Sports', 'Study', 'Gaming', 'Shopping', 'Transport', 'Campus Activity', 'Project', 'Other']

        return (
                <ScrollView style={styles.wrapper}>
                <Text style={styles.name}>Create Event</Text>
                <View>
                
                <GenerateForm
                ref={(c) => {
                this.formGenerator = c;
                }}
                fields={fields}
                />
                <Text style={styles.labelText}>Tags</Text>
        <TagSelect
          value={[arrayOfString[0]]}
          data={arrayOfString}
          ref={(tag) => {
            this.tagString = tag;
          }}
        />
                </View>
                <View style={styles.submitButton}>
                <Button block onPress={() => this.login(this.tagString.itemsSelected)}>
                <Text>Submit</Text>
                </Button>
                </View>
                


                </ScrollView>
                );
    }
}

AppRegistry.registerComponent('FormGenerator', () => FormGenerator);

