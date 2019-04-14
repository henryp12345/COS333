import React from "react";

import { createAppContainer, createBottomTabNavigator } from "react-navigation";

import { Icon, TabBar } from "../components";
import Home from "../screens/HomeScreen";
import Discover from "../screens/DiscoverScreen";
import Add from "../screens/AddEventScreen";
import Info from "../screens/InfoScreen";
import Profile from "../screens/Profile";

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
      screen: Profile,
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
        activeTintColor: '#F8F8F8', // active icon color
        inactiveTintColor: '#586589',  // inactive icon color
        style: {
            backgroundColor: '#171F33' // TabBar background
        }
    }
  }
);

export default createAppContainer(TabNav);
