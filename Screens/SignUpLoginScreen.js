import * as React from "react";
import {View,TextInput,StyleSheet, TouchableOpacity, Alert,Text} from "react-native";
import firebase from "firebase";
import db from "../config";

export default class SignUpLoginScreen extends React.Component{

    constructor(){
        super();
        this.state={
            emailId:'',
            password:''
        }
    }

    userLogin = (username, password)=>{
        firebase.auth().signInWithEmailAndPassword(username, password)
        .then(()=>{
            return Alert.alert("Successfully Login")
        })
        .catch((error)=>{
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
        })
    }

    userSignUp = (username, password) =>{
        firebase.auth().createUserWithEmailAndPassword(username,password)
        .then((response)=>{
            return Alert.alert("User Added Successfully")
        })
        .catch((error)=>{
            var errorCode = error.code;
            var errorMessage = error.message;
            return Alert.alert(errorMessage)
        })
    }

    render(){
        return(
            <View style={styles.container}>

                <Text style={[styles.text,{fontSize:35}]}>Barter App</Text>

                <TextInput
                    placeholder="abc@email.com"
                    keyboardType={'email-address'}
                    style={styles.input}
                    onChangeText={(text)=>{
                        this.setState({
                            emailId:text
                        })
                    }}
                    />

                <TextInput
                    placeholder="password"
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={(text)=>{
                        this.setState({
                            password:text
                        })
                    }}
                    />
                <View style={{alignItems:'center'}}>
                    <TouchableOpacity 
                    style={styles.button}
                    onPress = {()=>{this.userLogin(this.state.emailId , this.state.password)}}
                    >
                    <Text style={styles.text}>LOGIN</Text>

                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={styles.button}
                    onPress = {()=>{this.userSignUp(this.state.emailId , this.state.password)}}
                    >
                    <Text style={styles.text}>SIGN UP</Text>

                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#E0EEF0'
    },
    
    input: {
        backgroundColor: 'pink',
        borderRadius:10,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        marginTop: 10,
        borderWidth:2,
        width:"80%",
        height:60,
        fontSize:30,
        padding:15
    },
    button: {
      backgroundColor: 'lightblue',
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      marginTop: 10,
      borderWidth:2,
      width:150,
      height:50,
    },
    text:{
        color:'navy',
        fontSize:18, 
        fontWeight:'bold'
    }
  });
