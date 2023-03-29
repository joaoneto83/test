import React, { useState, useEffect } from 'react';
import { Text,View,ScrollView } from "react-native";
import ButtonRadio from '../buttons/ButtonRadio';
import ButtonControllo from '../buttons/ButtonControllo';


import styles from "./list-styles";
import { TextInput } from 'react-native-gesture-handler';


function ListControllo(props) {
    const [item, getitem] = useState("");
    
    const [value, callbackButton] = useState("")

   useEffect(() => {
    console.log("listControllo",props.list?.attributes, value)
    props.callbackControllo(value)
   }, [item,value]
   )


      return (
       
        <View >
           
               <Text style={styles.title}>{props?.list?.name}</Text>
              
        <View style={styles.listControllo}>
         
        <View >
         {props.list?.attributes?.map((item) => (
          <View style={styles.boxInfoControllo}>
                <Text style={styles.labelControllo}>{item.description} : </Text>
          </View >
            ))}
         </View>
         <View >
         {props.list?.attributes?.map((item) => (
          <View style={styles.boxInfoControllo}>
                {item.format == 3 ? <ButtonRadio values={item.goodValue} id = {item.id} callbackButtonRadio = {callbackButton}/> : item.format == 4 ?
                <ButtonControllo values={item.goodValue} list={item.list} id = {item.id} name={item.description} callbackButtonControllo = {callbackButton}/> : item.format == 2 ? <TextInput style={{backgroundColor:"#e9e9ee", minWidth:100, height:35, marginTop:5,marginLeft:2, borderRadius:5}}  onChangeText= {(text)=> props.callbackControllo(text) }/> : <TextInput style={{backgroundColor:"#e9e9ee", minWidth:100, height:35, marginTop:5,marginLeft:2, borderRadius:5}}  onChangeText= {(text)=> props.callbackControllo(text) }/>}
          </View >
            ))}
         </View> 
     
         </View>
  
        </View>  
    
      );
  };

  export default ListControllo;