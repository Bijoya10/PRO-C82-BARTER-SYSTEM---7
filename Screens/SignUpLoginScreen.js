import * as React from "react";
import {View,TextInput,StyleSheet, TouchableOpacity, Alert,Text,Modal,ScrollView,KeyboardAvoidingView} from "react-native";
import firebase from "firebase";
import db from "../config";

export default class SignUpLoginScreen extends React.Component{

    constructor(){
        super();
        this.state={
            emailId:'',
            password:'',
            isModalVisible:false,
            firstName:"",
            lastName:"",
            mobile:"",
            address:"",
            userName:"",
            confirmPassword:""
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

    userSignUp = (username, password,confirmPassword) =>{
        if(password!==confirmPassword){
            return Alert.alert("Passwords don't match");
        }else{
            firebase.auth().createUserWithEmailAndPassword(username,password)
            .then((response)=>{
                return Alert.alert("User Added Successfully")
            })
            .catch((error)=>{
                var errorCode = error.code;
                var errorMessage = error.message;
                return Alert.alert(errorMessage)
            })
            
            db.collection("users").add({
                emailId:this.state.emailId,
                firstName:this.state.firstName,
                lastName:this.state.lastName,
                mobile:this.state.mobile,
                address:this.state.address,
                userName:this.state.userName,
            })
            return("User added successfully");
        }
        

        
    }

    showModal=()=>{ 
        
        return(
        <View style={styles.container}>
            <Modal
                animationType="fade"
                transparent={false}
                visible={this.state.isModalVisible}
                >
                    <ScrollView>
                        <KeyboardAvoidingView>
                            <TextInput 
                                placeholder={"First name"}
                                style={styles.inputModal}
                                value={this.state.firstName}
                                onChangeText={(text)=>{
                                    this.setState({
                                        firstName:text
                                    })
                                }}/>
                            
                            <TextInput
                                placeholder="Last name"
                                style={styles.inputModal}
                                value={this.state.lastName}
                                onChangeText={(text)=>{
                                    this.setState({
                                        lastName:text
                                    })
                                }}/>
                            
                            <TextInput
                                placeholder="Mobile Number"
                                style={styles.inputModal}
                                value={this.state.mobile}
                                keyboardType={"numeric"}
                                onChangeText={(text)=>{
                                    this.setState({
                                        mobile:text
                                    })
                                }}/>
                            
                            <TextInput
                                placeholder="abc@email.com"
                                value={this.state.emailId}
                                style={styles.inputModal}
                                keyboardType={"email-address"}
                                onChangeText={(text)=>{
                                    this.setState({
                                        emailId:text
                                    })
                                }}/>
                            
                            <TextInput
                                placeholder="Address"
                                style={styles.inputModal}
                                value={this.state.address}
                                multiline
                                onChangeText={(text)=>{
                                    this.setState({
                                        address:text
                                    })
                                }}/>
                            
                            <TextInput
                                placeholder="User Name"
                                value={this.state.userName}
                                style={styles.inputModal}
                                onChangeText={(text)=>{
                                    this.setState({
                                        userName:text
                                    })
                                }}/>

                            <TextInput
                                placeholder="Password"
                                value={this.state.password}
                                style={styles.inputModal}
                                secureTextEntry={true}
                                onChangeText={(text)=>{
                                    this.setState({
                                        password:text
                                    })
                                }}/>
                            <TextInput
                                placeholder="Confirm password"
                                value={this.state.confirmPassword}
                                style={styles.inputModal}
                                secureTextEntry={true}
                                onChangeText={(text)=>{
                                    this.setState({
                                        confirmPassword:text
                                    })
                                }}/>

                            <TouchableOpacity 
                                style={styles.button}
                                onPress={()=>{
                                    this.userSignUp(this.state.emailId , this.state.password,this.state.confirmPassword)
                                    this.setState({isModalVisible:false})
                                    }}>
                                    <Text>Sign up</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.button}
                                onPress={()=>{
                                    this.setState({isModalVisible:false})
                                    }}>
                                    <Text>Cancel</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </ScrollView>
            </Modal>
         </View>
        
   
              )
    }
    
    render(){
        return(
            <View style={[styles.container,{flex:1,marginTop:0}]}>
              { this.showModal()}
                <Text style={[styles.text,{fontSize:35}]}>Barter App</Text>

                <TextInput
                    placeholder="abc@email.com"
                    keyboardType={'email-address'}
                    style={styles.input}
                    value={this.state.emailId}
                    onChangeText={(text)=>{
                        this.setState({
                            emailId:text
                        })
                    }}/>

                <TextInput
                    placeholder="password"
                    secureTextEntry={true}
                    style={styles.input}
                    value={this.state.emailId}
                    onChangeText={(text)=>{
                        this.setState({
                            password:text
                        })
                    }}/>

                <View style={{alignItems:'center'}}>
                    <TouchableOpacity 
                    style={styles.button}
                    onPress = {()=>{this.userLogin(this.state.emailId , this.state.password)}}
                    >
                    <Text style={styles.text}>LOGIN</Text>

                    </TouchableOpacity>

                    <TouchableOpacity 
                    style={styles.button}
                    onPress = {()=>{this.setState({isModalVisible:true})}}
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
        marginTop:100,
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
    },
    inputModal: {
        backgroundColor: 'pink',
        borderRadius:10,
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        borderRadius: 2,
        marginTop: 10,
        borderWidth:2,
        width:"80%",
        fontSize:15,
        padding:10
    },
  });
