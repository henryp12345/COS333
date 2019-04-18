import { createAppContainer, createStackNavigator } from "react-navigation";
import Login from "../screens/Login";
import Dashboard from "../screens/Dashboard";

const LoginStackNav = createStackNavigator({
	Login: {
		screen: Login,
		navigationOptions: {
			header: null
		}
	},
	Dashboard: { 
		screen: Dashboard 
	}
});

export default createAppContainer(LoginStackNav);
