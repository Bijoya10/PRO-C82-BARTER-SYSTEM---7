import * as React from 'react';
import {createBottomTabNavigator} from "react-navigation-tabs";
import {createDrawerNavigator} from "react-navigation-drawer";
import {createAppContainer,createSwitchNavigator} from "react-navigation";
import SignUpLoginScreen from "./Screens/SignUpLoginScreen";
import SettingsScreen from "./Screens/SettingsScreen";
import CustomSideBarMenu from './components/CustomSideBarMenu';
import HomeScreen from "./Screens/HomeScreen";
import ExchangeScreen from "./Screens/ExchangeScreen";

export default class App extends React.Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}

var AppTabNavigator=createBottomTabNavigator({
  HomeScreen:{screen:HomeScreen},
  Exchange:{screen:ExchangeScreen}
})

const AppDrawerNavigator=createDrawerNavigator({
    Home:{screen:AppTabNavigator},
    SettingsScreen:{screen:SettingsScreen}
  },
  {
    contentComponent:CustomSideBarMenu
  },
  {
    initialRouteName:"Home"
  }
)

const SwitchNavigator= createSwitchNavigator({
  SignUpLoginScreen:{screen:SignUpLoginScreen},
  AppDrawerNavigator:{screen:AppDrawerNavigator}
})

var AppContainer=createAppContainer(SwitchNavigator)

