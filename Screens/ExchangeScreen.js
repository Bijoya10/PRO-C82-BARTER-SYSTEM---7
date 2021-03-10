import * as React from "react";
import {View,Text,TextInput,TouchableOpacity,StyleSheet} from "react-native";
import MyHeader from "../components/MyHeader";
import db from "../config";
import firebase from "firebase";

export default class ExchangeScreen extends React.Component{
    constructor(){
        super();
        this.state={
            userName:firebase.auth().currentUser.email,
            nameOfObject:"",
            description:""
        }
    }

    createUniqueId(){
        return Math.random().toString(32).slice(2,7)
    }

    addItem=()=>{
        var exchangeId=this.createUniqueId()
        db.collection("allRequests").add({
            userName:this.state.userName,
            nameOfObject:this.state.nameOfObject,
            description:this.state.description,
            exchangeId:exchangeId
        })
        this.setState({
            nameOfObject:"",
            description:""
        })
        this.props.navigation.navigate("Home")
    }
    render(){
        return(
            <View style={styles.container}>
                <MyHeader/>
                
                <TextInput
                    style={styles.inputBox}
                    placeholder="Object name"
                    onChangeText={(text)=>{
                        this.setState({nameOfObject:text})
                    }}
                    value={this.state.nameOfObject}
                    />
                <TextInput
                    style={styles.inputBox}
                    placeholder="Reason"
                    multiline
                    numberOfLines={8}
                    onChangeText={(text)=>{
                        this.setState({description:text})
                    }}
                    value={this.state.description}
                    />

                <TouchableOpacity
                    style={styles.button}
                    onPress={()=>{
                            this.addItem()}}>
                    <Text style={styles.buttonText}>Request</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles=StyleSheet.create({
    container:{
        
        justifyContent:"center",
        alignItems:"center"
    },
    inputBox:{
        borderWidth:3,
        borderRadius:3,
        width:"80%",
        padding:15,
        marginTop:30,
        fontSize:15
    },
    button:{
        borderRadius:10,
        width:"50%",
        backgroundColor:"#444444",
        padding:15,
        marginTop:30,
        fontSize:15,
        alignItems:"center"
    },
    buttonText:{
        color:"white",
        fontWeight:"bold",
        fontSize:15
    }
})