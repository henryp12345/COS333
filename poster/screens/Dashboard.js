import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DetailsStackNav from "../navigators/DetailsStackNav";
import { NavigationActions } from "react-navigation";

export default class Dashboard extends Component {
	static router = DetailsStackNav.router;

	static navigationOptions = ({ navigation }) => {
		return {
			title: 'p o s t e r',
			headerLeft: null
		};
	};

	render() {
		return(<DetailsStackNav navigation={this.props.navigation}
                            screenProps={{userId: this.props.navigation.getParam('userId')}}/>);
	}
}
