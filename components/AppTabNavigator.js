import * as React from "react";
import {createBottomTabNavigator} from "react-navigation-tabs";
import HomeScreen from "../Screens/HomeScreen";
import ExchangeScreen from "../Screens/ExchangeScreen";

export const AppTabNavigator=createBottomTabNavigator({
    Home:{screen:HomeScreen},
    Exchange:{screen:ExchangeScreen}
})

