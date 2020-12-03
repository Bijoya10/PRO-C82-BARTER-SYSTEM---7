import * as React from 'react';
import {View} from 'react-native';
import {createAppContainer,createSwitchNavigator} from "react-navigation";
import SignUpLoginScreen from "./Screens/SignUpLoginScreen";
import {AppTabNavigator} from "./components/AppTabNavigator";

export default class App extends React.Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}

const TabNavigator= createSwitchNavigator({
  SignUpLoginScreen:{screen:SignUpLoginScreen},
  AppTabNavigator:{screen:AppTabNavigator}
})

var AppContainer=createAppContainer(TabNavigator)

