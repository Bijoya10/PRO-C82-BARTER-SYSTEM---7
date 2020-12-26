import * as React from "react";
import {View,Text,StyleSheet} from "react-native";

export default class SettingsScreen extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Text>
                    Settings screen
                </Text>
            </View>
        )
    }
}

var styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent:"center"
    }
})