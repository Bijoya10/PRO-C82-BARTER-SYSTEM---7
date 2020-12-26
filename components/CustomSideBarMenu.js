import * as React from "react";
import {View, TouchableOpacity,Text, StyleSheet} from "react-native";
import {DrawerItems} from "react-navigation-drawer";
import firebase from "firebase";

export default class CustomSideBarMenu extends React.Component{
    render(){
        return(
            <View style={{flex:1,marginTop:30}}>
                <View style={{flex:0.8}}>
                    <DrawerItems {...this.props}/>
                </View>
                <View style={{flex:0.2}}>
                    <TouchableOpacity
                     style={styles.button}
                     onPress={()=>{
                        this.props.navigation.navigate("SignUpLoginScreen");
                        firebase.auth().signOut();
                     }}>
                        <Text>LogOut</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

var styles=StyleSheet.create({
    button:{
        alignItems:"center",
        justifyContent:"center",
        height:50,
        width:"60%",
        backgroundColor:"lightblue",
        borderRadius:10
    }
})