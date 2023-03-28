import React, { useState, useEffect } from 'react';
import { Text,TouchableOpacity,View } from "react-native";

import styles from "./button-styles";


function ButtonControllo(props) {
    const [controllo, getControllo] = useState("");

   useEffect(() => {
    console.log("controllo",props,controllo )
    props.callbackButtonControllo(value = {value:controllo, id: props.id })
   }, [controllo]
   )
      return (
        <View style={styles.containerControllo} >
         {  props.values.map((item) => (
             <TouchableOpacity  onPress={() => getControllo(item.value)}  >
         {item.value == controllo ? <Text style={styles.textTrue}> {item.value}</Text> : <Text style={styles.textFalse}> {item.value}</Text>}
           </TouchableOpacity>
            ) )
         } 
        </View>   
      );
  };

  export default ButtonControllo;