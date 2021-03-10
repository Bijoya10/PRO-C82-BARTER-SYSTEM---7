import * as React from 'react';
import {createBottomTabNavigator} from "react-navigation-tabs";
import {createDrawerNavigator} from "react-navigation-drawer";
import {createAppContainer,createSwitchNavigator} from "react-navigation";
import SignUpLoginScreen from "./Screens/SignUpLoginScreen";
import SettingsScreen from "./Screens/SettingsScreen";
import CustomSideBarMenu from './components/CustomSideBarMenu';
import HomeScreen from "./Screens/HomeScreen";
import ExchangeScreen from "./Screens/ExchangeScreen";
import {createStackNavigator} from "react-navigation-stack"
import UserDetailsScreen from "./Screens/UserDetails";
import  MyBartersScreen from "./Screens/myBarters"

export default class App extends React.Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}
const StackNavigator=createStackNavigator({
  BarterList:{screen:HomeScreen,
  navigationOptions:{
    headerShown:false
  }
  },
  UserDetailsScreen:{screen:UserDetailsScreen}
},
{
  initialRouteName:"BarterList"
})



var AppTabNavigator=createBottomTabNavigator({
  HomeScreen:{screen:StackNavigator},
  Exchange:{screen:ExchangeScreen}
})

const AppDrawerNavigator=createDrawerNavigator({
    Home:{screen:AppTabNavigator},
    SettingsScreen:{screen:SettingsScreen},
    MyBarters:{screen:MyBartersScreen}
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

