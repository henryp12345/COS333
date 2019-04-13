import { createAppContainer, createStackNavigator } from "react-navigation";
import TabNav from "./TabNav";
import EventDetail from "../screens/EventDetail";

const DetailsStackNav = createStackNavigator(
	{
		TabNav: { screen: TabNav },
		EventDetail: { screen: EventDetail }
	},
	{
		headerMode: "none"
	}
);

export default createAppContainer(DetailsStackNav);
