import React, { useState, useEffect } from 'react';
import { Text,TouchableOpacity,View } from "react-native";

import styles from "./button-styles";


function ButtonRadioQRcode (props) {
    const [onoff, getOnOff] = useState("Senza QRcode");
    
   useEffect(() => {
    console.log("radioQr",onoff );
    props.callbackButtonRadio(onoff)
   }, [onoff]
   )
 
 
      return (
        <View>
        {onoff == "Senza QRcode" ?  
        <TouchableOpacity   style={[styles.containerOnOff,{height:40}]}   onPress = {()=>  getOnOff("Non legge QRcode")}  >
           <Text style={[styles.textTrue , styles.font]}> Senza QRcode </Text>  
           <Text style={[styles.textFalse, styles.font]}>Non legge QRcode</Text>     
       </TouchableOpacity> :
       <TouchableOpacity   style={[styles.containerOnOff,{height:40}]}   onPress = {()=>  getOnOff("Senza QRcode")}  >
       <Text style={[styles.textFalse, styles.font]}> Senza QRcode </Text>  
       <Text style={[styles.textTrue, styles.font]}>Non legge QRcode</Text>
           </TouchableOpacity>
        }
        </View>   
      );
  };

  export default ButtonRadioQRcode;