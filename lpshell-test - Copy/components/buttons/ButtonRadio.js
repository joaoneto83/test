import React, { useState, useEffect } from 'react';
import { Text,TouchableOpacity,View } from "react-native";

import styles from "./button-styles";


function ButtonRadio(props) {
    const [onoff, getOnOff] = useState(props.values);
    
   useEffect(() => {
    console.log("radio",onoff,props.values )
    props.callbackButtonRadio(value = {value :onoff, id:props.id})
   }, [onoff]
   )
 
 
      return (
        <View>
        {onoff == "true" ?  
        <TouchableOpacity   style={styles.containerOnOff}   onPress = {()=>  getOnOff("false")}  >
           <Text style={styles.textTrue}> SI </Text>  
           <Text style={styles.textFalse}>NO</Text>     
       </TouchableOpacity> :
       <TouchableOpacity   style={styles.containerOnOff}   onPress = {()=>  getOnOff("true")}  >
       <Text style={styles.textFalse}> SI </Text>  
       <Text style={styles.textTrue}>NO</Text>
           </TouchableOpacity>
        }
        </View>   
      );
  };

  export default ButtonRadio;