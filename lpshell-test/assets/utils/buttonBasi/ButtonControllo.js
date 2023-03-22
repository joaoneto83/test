import React, { useState, useEffect } from 'react';
import { Text,TouchableOpacity,View } from "react-native";

import styles from "./button-styles";


function ButtonControllo(props) {
    const [controllo, getOnOff] = useState("");

   useEffect(() => {
    console.log("controllo",props,controllo )
    
   }, [controllo]
   )
 
 
      return (
        <View style={styles.containerControllo} >
          
         {  props.routes.map((item) => (
             <TouchableOpacity  onPress={() => getOnOff(item.value)}  >
         {item.value == controllo ? <Text style={styles.textTrue}> {item.value}</Text> : <Text style={styles.textFalse}> {item.value}</Text>}
           </TouchableOpacity>
            ) )
         } 
        </View>   
      );
  };

  export default ButtonControllo;