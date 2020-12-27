import * as React from "react";
import {View,Text,StyleSheet,TextInput,TouchableOpacity} from "react-native";
import MyHeader from "../components/MyHeader";
import firebase from "firebase";
import db from "../config";
import { Alert } from "react-native";

export default class SettingsScreen extends React.Component{
    constructor(){
        super();
        this.state={
            firstName:"",
            lastName:"",
            mobile:"",
            address:"",
            emailId:'',
            docId:""
        }
    }

    getData(){
        var email=firebase.auth().currentUser.email
        db.collection("users").where("emailId","==",email).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var data=doc.data();
                this.setState({
                    firstName:data.firstName,
                    lastName:data.lastName,
                    emailId:data.emailId,
                    mobile:data.mobile,
                    address:data.address,
                    docId:doc.id
                })
            })
        })
    }

    componentDidMount(){
        this.getData();
    }

    updateData(){
        db.collection("users").doc(this.state.docId)
        .update({
            firstName:this.state.firstName,
            lastName:this.state.lastName,
            emailId:this.state.emailId,
            mobile:this.state.mobile,
            address:this.state.address,
        })
        Alert.alert("User data updated successfully");
    }

    render(){
        return(
            <View style={styles.container}>
                <MyHeader/>
                
                    <Text style={[styles.text,{color:"#C95675"}]}>Update data</Text>
                    <TextInput 
                        placeholder={"First name"}
                        style={styles.input}
                        value={this.state.firstName}
                        onChangeText={(text)=>{
                            this.setState({
                                firstName:text
                            })
                        }}/>
                    
                    <TextInput
                        placeholder="Last name"
                        style={styles.input}
                        value={this.state.lastName}
                        onChangeText={(text)=>{
                            this.setState({
                                lastName:text
                            })
                        }}/>
                    
                    <TextInput
                        placeholder="Mobile Number"
                        style={styles.input}
                        value={this.state.mobile}
                        keyboardType={"numeric"}
                        onChangeText={(text)=>{
                            this.setState({
                                mobile:text
                            })
                        }}/>
                    
                    <TextInput
                        placeholder="Address"
                        style={styles.input}
                        value={this.state.address}
                        multiline
                        onChangeText={(text)=>{
                            this.setState({
                                address:text
                            })
                        }}/>
                    <TouchableOpacity 
                            style={styles.button}
                            onPress={()=>{
                                this.updateData();
                                }}>
                            <Text style={styles.text}>Save</Text>
                    </TouchableOpacity>
                            
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent:"center",
        alignItems: 'center',
    },
    
    input: {
        backgroundColor: '#FFF2F3',
        borderRadius:10,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        marginTop: 10,
        borderWidth:2,
        width:"80%",
        height:60,
        fontSize:20,
        padding:10
    },
    button: {
      backgroundColor: '#C95675',
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
        color:'#FFF2F3',
        fontSize:18, 
        fontWeight:'bold'
    }
  });
