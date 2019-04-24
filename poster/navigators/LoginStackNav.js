import { createAppContainer, createStackNavigator } from "react-navigation";
import Login from "../screens/Login";
import Dashboard from "../screens/Dashboard";

const LoginStackNav = createStackNavigator({
	Login: {
		screen: Login,
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
}
});

export default createAppContainer(LoginStackNav);
