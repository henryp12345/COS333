import { createAppContainer, createStackNavigator } from "react-navigation";
import TabNav from "./TabNav";
import Chatroom from "../screens/Chatroom";

const ChatStackNav = createStackNavigator (
  {
    TabNav: {screen: TabNav},
    Chatroom: {screen: Chatroom}
  },
  {
    headerMode: "none"
  }
);

export default createAppContainer(ChatStackNav);
