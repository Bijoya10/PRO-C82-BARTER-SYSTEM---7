import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList,TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements'
import firebase from 'firebase';
import db from '../config';
import MyHeader from "../components/MyHeader"

export default class HomeScreen extends Component{
  constructor(){
    super()
    this.state = {
      ExchangeObjectList : []
    }
  this.requestRef= null
  }

  getExchangeObjectList =()=>{
    this.requestRef = db.collection("allRequests")
    .onSnapshot((snapshot)=>{
      var ExchangeObjectList = snapshot.docs.map(document => document.data());
      this.setState({
        ExchangeObjectList : ExchangeObjectList
      });
    })
  }

  componentDidMount(){
    this.getExchangeObjectList()
  }

  componentWillUnmount(){
    this.requestRef();
  }

  keyExtractor = (item, index) => index.toString()

  renderItem = ( {item, i} ) =>{
    return (
      <ListItem
        key={i}
        title={item.nameOfObject}
        subtitle={item.description}
        titleStyle={{ color: 'black', fontWeight: 'bold' }}
        rightElement={
            <TouchableOpacity style={styles.button}>
              <Text style={{color:'#ffff'}}>View</Text>
            </TouchableOpacity>
          }
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
            this.state.ExchangeObjectList.length === 0
            ?(
              <View style={styles.subContainer}>
                <Text style={{ fontSize: 20}}>List Of All Requested Books</Text>
              </View>
            )
            :(
              <FlatList
                keyExtractor={this.keyExtractor}
                data={this.state.ExchangeObjectList}
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
