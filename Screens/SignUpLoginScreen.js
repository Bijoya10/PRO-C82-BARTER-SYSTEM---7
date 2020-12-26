import * as React from "react";
import {View,TextInput,StyleSheet,TouchableOpacity,Alert,Text,Modal,ScrollView,KeyboardAvoidingView} from "react-native";
import firebase from "firebase";
import db from "../config";
import MyHeader from "../components/MyHeader";

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
            this.props.navigation.navigate("HomeScreen");
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
                        <MyHeader/>
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
                                placeholder="abc@email.com"
                                value={this.state.emailId}
                                style={styles.input}
                                keyboardType={"email-address"}
                                onChangeText={(text)=>{
                                    this.setState({
                                        emailId:text
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
                            
                            <TextInput
                                placeholder="User Name"
                                value={this.state.userName}
                                style={styles.input}
                                onChangeText={(text)=>{
                                    this.setState({
                                        userName:text
                                    })
                                }}/>

                            <TextInput
                                placeholder="Password"
                                value={this.state.password}
                                style={styles.input}
                                secureTextEntry={true}
                                onChangeText={(text)=>{
                                    this.setState({
                                        password:text
                                    })
                                }}/>
                            <TextInput
                                placeholder="Confirm password"
                                value={this.state.confirmPassword}
                                style={styles.input}
                                secureTextEntry={true}
                                onChangeText={(text)=>{
                                    this.setState({
                                        confirmPassword:text
                                    })
                                }}/>
                            <View style={styles.container}>
                                <TouchableOpacity 
                                    style={styles.button}
                                    onPress={()=>{
                                        this.userSignUp(this.state.emailId , this.state.password,this.state.confirmPassword)
                                        this.setState({isModalVisible:false})
                                        }}>
                                        <Text style={styles.text}>Registration</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.button}
                                    onPress={()=>{
                                        this.setState({isModalVisible:false})
                                        }}>
                                        <Text style={styles.text}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </KeyboardAvoidingView>
                    </ScrollView>
            </Modal>
         </View>
        
   
              )
    }
    
    render(){
        return(
            <View style={styles.container}>
              { this.showModal()}
                <MyHeader/>
                <View style={[styles.container,{marginTop:100}]}></View>
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
                    value={this.state.password}
                    onChangeText={(text)=>{
                        this.setState({
                            password:text
                        })
                    }}/>

                <View style={styles.container}>
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
