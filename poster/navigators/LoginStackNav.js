import { createAppContainer, createStackNavigator } from "react-navigation";
import Login from "../screens/Login";
import createUser from "../screens/createUser";
import Dashboard from "../navigators/Dashboard";

const LoginStackNav = createStackNavigator({
	Login: {
		screen: Login,
		navigationOptions: {
			header: null,
			gesturesEnabled: false,
		}
	},
	createUser: { 
		screen: createUser,
		navigationOptions: {
		header: null,
		gesturesEnabled: false,
	}
},
	Dashboard: { 
		screen: Dashboard,
		navigationOptions: {
		gesturesEnabled: false,
	}
},

});

export default createAppContainer(LoginStackNav);
