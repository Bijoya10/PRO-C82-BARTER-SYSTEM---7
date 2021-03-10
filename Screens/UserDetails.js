import * as React from "react";
import {View,Text,StyleSheet,TouchableOpacity} from "react-native";
import {Card} from "react-native-elements"
import MyHeader from "../components/MyHeader";
import firebase from "firebase";
import db from "../config";


export default class UserDetailsScreen extends React.Component{
    constructor(props){
        super(props);
        this.state={
            firstName:"",
            lastName:"",
            mobile:"",
            address:"",
            currentUserFirstName:"",
            currentUserLastName:"",
            currentUserMobile:"",
            currentUserAddress:"",
            currentUserEmailId:firebase.auth().currentUser.email,
            docId:"",
            userName:this.props.navigation.getParam("details")["userName"],
            nameOfObject:this.props.navigation.getParam("details")["nameOfObject"],
            uniqueId:this.props.navigation.getParam("details")["uniqueId"]
        }
    }

    getData(){
        //data of currentUser
        db.collection("users").where("emailId","==",this.state.currentUserEmailId).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var data=doc.data();
                this.setState({
                    currentUserFirstName:data.firstName,
                    currentUserLastName:data.lastName,
                    currentUserMobile:data.mobile,
                    currentUserAddress:data.address,
                })
            })
        })
        //data of requestee
        db.collection("users").where("emailId","==",this.state.userName).get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                var data=doc.data();
                this.setState({
                    firstName:data.firstName,
                    lastName:data.lastName,
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

    myBarters=()=>{
        db.collection("myBarters").add({
            exchangerEmailId:this.state.currentUserEmailId,
            nameOfObject:this.state.nameOfObject,
            exchangerName: this.state.currentUserFirstName+" "+this.state.currentUserLastName,
            exchangerAddress:this.state.currentUserAddress,
            exchangerMobile:this.state.currentUserMobile,
            exchangerStatus:"User interested"
        })
    }

    render(){
        return(
            <View style={styles.container}>
                <MyHeader/>
                
                    <Text style={[styles.text,{color:"#C95675"}]}>User details </Text>
                    <Card><Text>Email ID: {this.state.userName}</Text></Card>
                    <Card><Text>Name : {this.state.firstName+" " +this.state.lastName}</Text></Card>
                    <Card><Text>Phone Number: {this.state.mobile}</Text></Card>
                    <Card><Text> Address: {this.state.address}</Text></Card>
                    {this.state.currentUserEmailId===this.state.userName?null:(
                        <TouchableOpacity style={styles.button} onPress={()=>{
                            this.myBarters()
                        }}
                        >
                            <Text style={styles.text}>Exchange</Text>
                        </TouchableOpacity>
                    )}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent:"center",
        
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
        fontWeight:'bold',
        textAlign:"center"
    }
  });
