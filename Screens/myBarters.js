import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config';
import MyHeader from "../components/MyHeader"

export default class MyBartersScreen extends Component{
  constructor(){
    super()
    this.state = {
      myBartersList : [],
      email:firebase.auth().currentUser.email
    }
  this.requestRef= null
  }

  getMyBartersList =()=>{
    this.requestRef = db.collection("myBarters").where("exchangerEmailId","==",this.state.email).onSnapshot((snapshot)=>{
      var myBartersList = snapshot.docs.map(document => document.data());
      this.setState({
        myBartersList : myBartersList
      });
    })
  }

  componentDidMount(){
    this.getMyBartersList()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={"Exchanger : "+item.exchangerName}
        subtitle={"Item : "+item.nameOfObject}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        bottomDivider
      />
    )
  }

  render(){
    return(
      <View style={{flex:1}}>
        <MyHeader/>
       
        <View style={{flex:1}}>
          {
            this.state.myBartersList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Requested Books</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.myBartersList}
                renderItem={this.renderItem}
              />
            )
            }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  subContainer:{
    flex:1,
    fontSize: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  button:{
    width:100,
    height:30,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:"#444444",
    shadowColor: "#000",
    shadowOffset: {
       width: 0,
       height: 8
     }
  }
})
