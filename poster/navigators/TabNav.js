import React from "react";

import { createAppContainer, createBottomTabNavigator } from "react-navigation";

import { Icon, TabBar } from "../components";
import Home from "../screens/HomeScreen";
import Discover from "../screens/DiscoverScreen";
import Add from "../screens/AddEventScreen";
import Info from "../screens/InfoScreen";
import Test from "../screens/Profile";

const TabNav = createBottomTabNavigator(
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
    
    Profile: {
      screen: Test,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="Profile" color={tintColor} />
      }
    },
    InfoScreen: {
      screen: Info,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => <Icon name="Info" color={tintColor} />
      }
    }
  },

  {
    tabBarOptions: {
        showLabel: false, // hide labels
        activeTintColor: '#558fed', // active icon color
        inactiveTintColor: '#aeb3ba',  // inactive icon color
        style: {
            backgroundColor: '#ffffff' // TabBar background
        }
    }
  }
);

export default createAppContainer(TabNav);
