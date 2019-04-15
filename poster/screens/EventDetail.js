import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default class EventDetail extends Component {
	render() {
    const { navigation } = this.props;
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>Event Details</Text>
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