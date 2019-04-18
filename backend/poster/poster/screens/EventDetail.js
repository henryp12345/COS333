import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default class EventDetail extends Component {
  constructor(props) {
    super(props);
    this.state = { title: '',
                   desc: '',
                   location: '',
                   startDate: new Date(),
                   endDate: new Date(),
                   capacity: 0,
                   numberJoined: 0,
                   tags: '',
                   host: '',
    };
  }

  componentWillMount() {
  const { navigation } = this.props;
    return fetch("https://posterapp333.herokuapp.com/event/" + navigation.getParam('eventId', -1) + "/")
      .then((response) => {
        var eventData = JSON.parse(response._bodyText)[0];
        var startDate = new Date(eventData.startdate);
        var endDate = new Date(eventData.enddate)
        this.setState({ title: eventData.title,
                        desc: eventData.desc,
                        location: eventData.location,
                        startDate: startDate,
                        endDate: endDate,
                        capacity: eventData.capacity,
                        numberJoined: eventData.numberJoined,
                        tags: eventData.tags,
                        host: eventData.host,
        });
      });
  }
	render() {
    const { navigation } = this.props;
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Event Details</Text>
        <Text style={styles.params}> {this.state.title} </Text>
        <Text style={styles.params}> {this.state.tags} </Text>
				<Text style={styles.params}>Params Passed:{'\n'} {navigation.state.params.topic}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
					<Text style={styles.link}>Go Back</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#F5FCFF"
	},
	welcome: {
		fontSize: 20,
		textAlign: "center",
		margin: 10
	},
	params: {
		textAlign: "center",
		margin: 10
	},
  link: {
		fontSize: 16,
		textAlign: "center",
		margin: 10
	}
});
