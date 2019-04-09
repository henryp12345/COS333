import React from "react";

import { createAppContainer, createBottomTabNavigator } from "react-navigation";

import { Icon, TabBar } from "./src/components";
import Home from "./src/screens/HomeScreen";
import Discover from "./src/screens/DiscoverScreen";
import Add from "./src/screens/AddEventScreen";
import Joined from "./src/screens/JoinedEventsScreen";
import Profile from "./src/screens/Profile";

const TabNavigator = createBottomTabNavigator(
  {
    HomeScreen: {
      screen: Home,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="Home" color={tintColor} />
      }
    },
    DiscoverScreen: {
      screen: Discover,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="Discover" color={tintColor} />
      }
    },
    AddEventScreen: {
      screen: Add,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="Add" color={tintColor} />
      }
    },
    JoinedEventsScreen: {
      screen: Joined,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="Joined" color={tintColor} />
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="Profile" color={tintColor} />
      }
    }
  },

  {
    tabBarOptions: {
        showLabel: false, // hide labels
        activeTintColor: '#F8F8F8', // active icon color
        inactiveTintColor: '#586589',  // inactive icon color
        style: {
            backgroundColor: '#171F33' // TabBar background
        }
    }
  }
);

export default createAppContainer(TabNavigator);
